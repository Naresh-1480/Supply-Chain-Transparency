const Web3 = require("web3");
const web3 = new Web3("https://mainnet.infura.io/v3/f545d9638ddc49d1ac417e009b81bf90");

const contractABI = [/* Your Contract ABI */];
const contractAddress = "0xYourContractAddress";

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to interact with the smart contract
async function addSupplyChainData(data) {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.addProductData(data).send({ from: accounts[0] });
}

module.exports = { addSupplyChainData };
