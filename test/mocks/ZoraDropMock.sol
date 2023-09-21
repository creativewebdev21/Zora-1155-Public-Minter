// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@ERC721A/contracts/ERC721A.sol";

contract ZoraDropMock is ERC721A {
    constructor() ERC721A("name", "SYM") {}

    function purchase(uint256 quantity) external payable returns (uint256) {
        _mintNFTs(msg.sender, quantity);
        uint256 firstMintedTokenId = _lastMintedTokenId() - quantity;
        return firstMintedTokenId;
    }

    /// @notice Getter for last minted token ID (gets next token id and subtracts 1)
    function _lastMintedTokenId() internal view returns (uint256) {
        return _nextTokenId() - 1;
    }

    /// @notice Function to mint NFTs
    /// @dev (important: Does not enforce max supply limit, enforce that limit earlier)
    /// @dev This batches in size of 8 as per recommended by ERC721A creators
    /// @param to address to mint NFTs to
    /// @param quantity number of NFTs to mint
    function _mintNFTs(address to, uint256 quantity) internal {
        uint256 MAX_MINT_BATCH_SIZE = 8;
        do {
            uint256 toMint = quantity > MAX_MINT_BATCH_SIZE
                ? MAX_MINT_BATCH_SIZE
                : quantity;
            _mint({to: to, quantity: toMint});
            quantity -= toMint;
        } while (quantity > 0);
    }

    /// @notice Start token ID for minting (1-100 vs 0-99)
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    /// @notice Mint a quantity of tokens with a comment that will pay out rewards
    /// @param recipient recipient of the tokens
    /// @param quantity quantity to purchase
    /// @param comment comment to include in the IERC721Drop.Sale event
    /// @param mintReferral The finder of the mint
    /// @return tokenId of the first token minted
    function mintWithRewards(
        address recipient,
        uint256 quantity,
        string calldata comment,
        address mintReferral
    ) external payable returns (uint256) {
        return
            _handleMintWithRewards(recipient, quantity, comment, mintReferral);
    }

    function _handleMintWithRewards(
        address recipient,
        uint256 quantity,
        string memory,
        address
    ) internal returns (uint256) {
        _mintNFTs(recipient, quantity);

        uint256 firstMintedTokenId = _lastMintedTokenId() - quantity;

        return firstMintedTokenId;
    }
}
