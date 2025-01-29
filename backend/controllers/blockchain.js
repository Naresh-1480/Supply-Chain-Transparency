// blockchain.js
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/f545d9638ddc49d1ac417e009b81bf90");
const web3 = new Web3(provider);

const contractABI = [ 
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" }
        ],
        "name": "getProduct",
        "outputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "origin", "type": "string" },
            { "internalType": "string", "name": "journey", "type": "string" },
            { "internalType": "bool", "name": "isAuthentic", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = "0x95CF291b65271C9b753A8b0F978561deF36fec32";
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function verifyProductAuthenticity(productId) {
    try {
        const result = await contract.methods.getProduct(productId).call();

        console.log('✅ Blockchain Data:', result);

        return {
            name: result.name,
            origin: result.origin,
            journey: result.journey,
            isAuthentic: result.isAuthentic
        };
    } catch (err) {
        console.error('❌ Blockchain Error:', err);
        return null;
    }
}

module.exports = { verifyProductAuthenticity };
