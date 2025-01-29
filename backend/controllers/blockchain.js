// Import Web3 library
const Web3 = require('web3');

// ✅ Correct Web3 v4+ Initialization
const web3 = new Web3("https://mainnet.infura.io/v3/f545d9638ddc49d1ac417e009b81bf90"); // Replace with your Infura Project ID

// Contract ABI (Replace with your actual contract ABI)
const contractABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" }
        ],
        "name": "getProduct",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Contract Address (Replace with your actual contract address)
const contractAddress = '0x95CF291b65271C9b753A8b0F978561deF36fec32';

// Initialize Smart Contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

/**
 * Function to verify product authenticity using blockchain
 * @param {number} productId - The ID of the product stored on blockchain
 * @returns {Promise<object|null>} - Product details or null if not found
 */
async function verifyProductAuthenticity(productId) {
    try {
        // Call the contract's getProduct method to fetch details
        const result = await contract.methods.getProduct(productId).call();
        
        // Log the result for debugging
        console.log('Product details:', result);

        // If result is not null or undefined, return the parsed details
        if (result && result.length === 4) {
            return {
                name: result[0],
                origin: result[1],
                journey: result[2],
                isAuthentic: result[3]
            };
        } else {
            console.error('❌ Invalid product data received from the blockchain.');
            return null;
        }
    } catch (err) {
        console.error('❌ Error verifying product on blockchain:', err);
        return null;
    }
}

// Example usage of the function
const productId = 1;  // Replace with the actual product ID you want to check
verifyProductAuthenticity(productId)
    .then((product) => {
        if (product) {
            console.log('Product Verified:', product);
        } else {
            console.log('Product not found or verification failed.');
        }
    })
    .catch((err) => {
        console.error('Error in verification process:', err);
    });

// Export the function for use in other parts of your backend if needed
module.exports = { verifyProductAuthenticity };
