//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

    /**
     * @notice returns URI of the metadata of concrete token.
     * @dev token with tokenId must exists
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        return string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
    }

    function _baseURI() internal view override returns(string memory) {
        return baseURI;
    }

    /**
     * @notice allows to mint new token.
     * @dev anyone can call mint function.
     * @param to address to wich new token will be minted
     */
    function mint(address to) external {
        _mint(to, counter);
        unchecked { ++counter; }
    }
}
