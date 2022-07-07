import { task } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("nft721-mint", "Allows to mint new NFT")
  .addParam("address", "address to wich new token will be minted")
  .setAction(async (taskArgs, {ethers}) => {
    const ContractFactory = await ethers.getContractFactory("NFT721");
    const contract = ContractFactory.attach(process.env.CONTRACT_ADDRESS!);

    await contract.mint(taskArgs.address)
      .then(async () => {
          console.log("Reward was successfully claimed");
      }, (error : any) => {
          console.log(error.reason);
      });
  });
