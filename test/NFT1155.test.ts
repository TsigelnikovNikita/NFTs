import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { NFT1155 } from "../typechain-types";

describe("NFT1155.mint", () => {
  let nft1155 : NFT1155;
  let owner : Signer;
  let user : Signer;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const nft1155Factory = await ethers.getContractFactory("NFT1155", owner);
    nft1155 = await nft1155Factory.deploy("metadataURI");
    await nft1155.deployed();
  });

  it("must throw an exception if caller is not owner", async () => {
    const userAddress = await user.getAddress();
    await expect(nft1155.connect(user).mint(userAddress, 1, 10))
      .to.revertedWith("Ownable: caller is not the owner");
  });

  it("must mint new NFT to the user", async () => {
    const userAddress = await user.getAddress();
    await nft1155.connect(owner).mint(userAddress, 1, 10);

    expect(await nft1155.balanceOf(userAddress, 1)).to.eq(10);
  });
});

describe("NFT721.uri", () => {
  let nft1155 : NFT1155;
  let owner : Signer;
  let user : Signer;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const nft1155Factory = await ethers.getContractFactory("NFT1155");
    nft1155 = await nft1155Factory.deploy("ipfs://QmUULVngBTSGWRurwVYEhdXiCj3d1mJnTyLYuVStPgNKGQ/");
    await nft1155.deployed();

    const userAddress = await user.getAddress();
    await nft1155.mint(userAddress, 1, 10);
  });

  it("must return correct tokenURI with tokenId", async () => {
    expect(await nft1155.uri(1))
      .to.eq("ipfs://QmUULVngBTSGWRurwVYEhdXiCj3d1mJnTyLYuVStPgNKGQ/1.json");
  });
});
