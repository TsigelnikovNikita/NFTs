import hre from "hardhat";

// Change name of contract here
const CONTRACT_NAME="NFT721";

/*
 * This script will generate and show report of storage layout of your contract using
 * hardhat-storage-layout package.
 * More details here: https://www.npmjs.com/package/hardhat-storage-layout
 */ 
async function main() {
    await hre.storageLayout.export();

    const contractFactory = await hre.ethers.getContractFactory(CONTRACT_NAME);
    const contract = await contractFactory.deploy(process.env.TOKEN_NAME!,
                                                    process.env.TOKEN_SYMBOL!,
                                                    process.env.TOKEN_URI!);
    await contract.deployed();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
