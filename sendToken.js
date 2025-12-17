const { ethers } = require("ethers");

// Settings
const RPC_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"; 

async function sendTransaction(privateKey, toAddress, amountEth) {
  try {
    // 1. Provider
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // 2. Wallet from private key
    const wallet = new ethers.Wallet(privateKey, provider);

    // 3. Build transaction
    const tx = {
      to: toAddress,
      value: ethers.parseEther(amountEth.toString()), // amount in ETH
    };

    // 4. Send transaction
    const sentTx = await wallet.sendTransaction(tx);

    console.log("Transaction sent!");
    console.log("TX Hash:", sentTx.hash);

    // 5. Wait for confirmation
    await sentTx.wait();
    console.log("Transaction confirmed!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run with arguments
const [,, privateKey, toAddress, amountEth] = process.argv;

if (!privateKey || !toAddress || !amountEth) {
  console.error("Usage: node sendToken.js <PRIVATE_KEY> <TO_ADDRESS> <AMOUNT>");
  process.exit(1);
}

sendTransaction(privateKey, toAddress, amountEth);
