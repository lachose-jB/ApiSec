# Blockchain-Powered API Security

A project to secure APIs using blockchain technology. This application leverages Ethereum smart contracts to validate and record API calls, ensuring enhanced data integrity and protection against unauthorized access.

## Features
- **Blockchain Integration**: Validate and record API calls using Ethereum smart contracts.
- **Secure Transactions**: Hash requests and store them immutably on the blockchain.
- **Scalable Design**: Modular structure for seamless integration with existing APIs.
- **Custom Middleware**: Verify API calls in real-time before processing.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MetaMask](https://metamask.io/) (for Ethereum wallet)
- An Ethereum testnet or local blockchain setup (e.g., [Ganache](https://trufflesuite.com/ganache/))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/blockchain-api-security.git
   cd blockchain-api-security
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the project root.
   - Add the following variables:
     ```env
     ETHEREUM_NODE_URL=<Your Ethereum Node URL>
     CONTRACT_ADDRESS=<Deployed Contract Address>
     PRIVATE_KEY=<Your Ethereum Wallet Private Key>
     ETHEREUM_ACCOUNT=<Your Ethereum Account Address>
     ```

4. Deploy the smart contract (if not already deployed):
   - Use Truffle or Hardhat to compile and deploy the contract.
   - Update the `CONTRACT_ADDRESS` in the `.env` file with the deployed address.

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Make API calls to your secured endpoints:
   - Use tools like [Postman](https://www.postman.com/) or `curl` to test the API.

3. Blockchain Validation:
   - Every API request will be hashed, validated, and recorded on the Ethereum blockchain.

## File Structure
```
.
├── contracts                # Solidity contracts for blockchain integration
├── middleware               # Custom middleware for request validation
├── public                   # Static assets
├── src                      # Main application logic
├── views                    # Frontend templates (if applicable)
├── .env                     # Environment variables
├── index.js                 # Entry point
└── package.json             # Project metadata and dependencies
```

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your message"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Web3.js](https://web3js.readthedocs.io/) for Ethereum blockchain interaction.
- [MetaMask SDK](https://github.com/MetaMask/metamask-sdk) for easy integration with MetaMask.
- [Express.js](https://expressjs.com/) for backend framework support.

## Contact
For questions or support, please reach out to **Jean-Baptiste Adjahouisso**:
- Email: [your-email@example.com](mailto:your-email@example.com)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/)

---

Happy Coding! 🚀
