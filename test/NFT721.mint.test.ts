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

  it("must mint new NFT", async () => {
    const tx = await nft721.mint(await user.getAddress());
  });
});
