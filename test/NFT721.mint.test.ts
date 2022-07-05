import { expect } from "chai";
import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";

describe("NFT721.mint", () => {
  let nft721 : Contract;
  let owner : Signer;
  let user : Signer;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const NFT721 = await ethers.getContractFactory("NFT721");
    nft721 = await NFT721.deploy("Crypton Studio NFT", "CSN", "TokenURI");
    await nft721.deployed();
  });

  it("must mint new NFT", async () => {
    const tx = await nft721.mint(await user.getAddress());
  });
});
