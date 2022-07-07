//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT1155 is ERC1155, Ownable {
    using Strings for uint256;

    constructor(string memory uri_) ERC1155(uri_) {
    }

    /**
     * @dev Token with tokenId must exists. Returns URI of the metadata of concrete token.
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(tokenId), tokenId.toString(), ".json"));
    }

    /**
     * @dev Allows to mint new token. Anyone can call mint function.
     *
     * @param to address to wich new token will be minted
     * @param id id of tokens
     * @param amount amount of tokens
     */
    function mint(address to, uint id, uint amount) external onlyOwner {
        _mint(to, id, amount, "");
    }
}
