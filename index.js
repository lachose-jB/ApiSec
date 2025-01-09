import { MetaMaskSDK } from "@metamask/sdk";

async function connectToMetaMask() {
  try {
    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "Example Node.js Dapp",
      },
      infuraAPIKey: process.env.INFURA_API_KEY, // Utilisez une variable d'environnement pour la clé API
    });

    const accounts = await MMSDK.connect(); // Connexion à MetaMask
    console.log("Connected accounts:", accounts);

    const provider = MMSDK.getProvider();
    const accountsFromProvider = await provider.request({ method: "eth_accounts", params: [] });
    console.log("Accounts from provider:", accountsFromProvider);
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
}

connectToMetaMask();
