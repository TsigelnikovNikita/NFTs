import { ethers } from "hardhat";

const CONTRACT_NAME="NFT721";

async function main() {
    const contractFactory = await ethers.getContractFactory(CONTRACT_NAME);

    const contract = await contractFactory.deploy(process.env.TOKEN_NAME!,
                                                    process.env.TOKEN_SYMBOL!,
                                                    process.env.TOKEN_URI!);
    await contract.deployed();
    console.log(`${CONTRACT_NAME} deployed to: ${contract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});