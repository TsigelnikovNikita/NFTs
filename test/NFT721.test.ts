import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { NFT721, NFT721__factory } from "../typechain-types";

describe("NFT721.mint", () => {
  let nft721 : NFT721;
  let owner : Signer;
  let user : Signer;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    nft721 = await new NFT721__factory(owner).deploy("Crypton Studio NFT", "CSN", "TokenURI");
  });

  it("must mint new NFT to the user", async () => {
    const userAddress = await user.getAddress();
    await expect(() => nft721.mint(userAddress))
      .to.changeTokenBalance(nft721, user, 1);
  });

  it("must mint new NFT with id is equal to 1", async () => {
    const userAddress = await user.getAddress();
    await expect(nft721.mint(userAddress))
      .to.emit(nft721, "Transfer")
      .withArgs(ethers.constants.AddressZero, userAddress, 1);
  });
});

describe("NFT721.tokenURI", () => {
  let nft721 : NFT721;
  let owner : Signer;
  let user : Signer;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    nft721 = await new NFT721__factory(owner).deploy("Crypton Studio NFT", "CSN",
                                                      "ipfs://QmUULVngBTSGWRurwVYEhdXiCj3d1mJnTyLYuVStPgNKGQ/");
    const userAddress = await user.getAddress();
    await nft721.mint(userAddress);               
  });

  it("must return correct tokenURI with tokenId", async () => {
    expect(await nft721.tokenURI(1))
      .to.eq("ipfs://QmUULVngBTSGWRurwVYEhdXiCj3d1mJnTyLYuVStPgNKGQ/1.json");
  });

  it("must throw an exception if token is not minted", async () => {
    await expect(nft721.tokenURI(2))
      .to.be.revertedWith("ERC721: invalid token ID");
  });
});
