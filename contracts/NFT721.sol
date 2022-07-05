//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 // TODO: don't forget remove this after ending development!
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT721 is ERC721{
    using Strings for uint256;

    uint private counter = 1;
    string private baseURI;

    constructor(string memory name_,
                string memory symbol_,
                string memory baseURI_
                ) ERC721(name_, symbol_)
    {
        baseURI = baseURI_;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI_ = _baseURI();
        return string(abi.encodePacked(baseURI_, tokenId.toString(), ".json"));
    }

    function _baseURI() internal view override returns(string memory) {
        return baseURI;
    }

    function mint(address to) external {
        _mint(to, counter);
        unchecked { ++counter; }
    }
}
