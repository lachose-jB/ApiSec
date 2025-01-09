// blockchainValidator.js
const { Web3 } = require('web3');
const crypto = require('crypto');
require('dotenv').config();

class BlockchainValidator {
    constructor() {
        if (!process.env.ETHEREUM_NODE_URL) {
            throw new Error('ETHEREUM_NODE_URL is not defined in .env');
        }
        this.web3 = new Web3(process.env.ETHEREUM_NODE_URL);
        this.contract = new this.web3.eth.Contract(
            require('../contracts/APIValidator.json').abi,
            process.env.CONTRACT_ADDRESS
        );
    }

    // Fonction de génération du hachage pour la requête
    generateRequestHash(req) {
        const data = {
            method: req.method,
            url: req.url,
            body: req.body,
            timestamp: Date.now()
        };

        // Création d'un hachage SHA256
        const hash = crypto
            .createHash('sha256')
            .update(JSON.stringify(data))
            .digest('hex');

        // Vérification de la longueur du hash (devrait être de 64 caractères hexadécimaux)
        if (hash.length !== 64) {
            throw new Error('Generated hash is not of valid length (bytes32)');
        }

        // Retourner le hash en format hexadécimal (bytes32)
        return hash;
    }

    // Fonction de validation et enregistrement de la requête sur la blockchain
    async validateAndRecord(req, res, next) {
        try {
            const requestHash = this.generateRequestHash(req);

            // Construction de la transaction Ethereum
            const tx = this.contract.methods.recordAPICall(req.path, requestHash);
            const gas = await tx.estimateGas({ from: process.env.ETHEREUM_ACCOUNT });
            const gasPrice = await this.web3.eth.getGasPrice();
            const data = tx.encodeABI();
            const nonce = await this.web3.eth.getTransactionCount(process.env.ETHEREUM_ACCOUNT);

            // Signature de la transaction
            const signedTx = await this.web3.eth.accounts.signTransaction(
                {
                    to: process.env.CONTRACT_ADDRESS,
                    data,
                    gas,
                    gasPrice,
                    nonce
                },
                process.env.PRIVATE_KEY
            );

            // Envoi de la transaction vers le réseau Ethereum
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            console.log('Transaction successful:', receipt.transactionHash);

            // Ajouter les informations de validation à la requête
            req.blockchainValidation = {
                requestHash,
                timestamp: Date.now(),
                transactionHash: receipt.transactionHash
            };

            next();
        } catch (error) {
            console.error('Blockchain validation error:', error);
            res.status(500).json({ 
                error: 'API call validation failed',
                details: error.message 
            });
        }
    }
}

module.exports = new BlockchainValidator();
