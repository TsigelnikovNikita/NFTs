/*
 * These are constructor arguments of deployed contract. You are able to add any data, even
 * complex. Read more https://hardhat.org/plugins/nomiclabs-hardhat-etherscan#complex-arguments 
 */
module.exports = [
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL,
    process.env.TOKEN_URI
  ];
