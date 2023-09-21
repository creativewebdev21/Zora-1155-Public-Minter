// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// @title IZoraRewardsMint
/// @notice An interface for the Zora rewards mint functionality, allowing for minting tokens with rewards and including a referral address.
interface IZoraRewardsMint {
    /// @notice This function allows for minting a specified number of tokens, each associated with a comment and capable of generating rewards.
    /// @dev This function is payable, meaning it can receive Ether.
    ///      The minting also associates a referral address with the minting, potentially allowing for referral rewards.
    /// @param recipient The address that will receive the minted tokens.
    /// @param quantity The number of tokens to mint.
    /// @param comment A comment or note that will be associated with the token(s) at the time of minting.
    /// @param mintReferral An address that referred the minting, potentially for reward or tracking purposes.
    /// @return tokenId The ID of the first token minted in this transaction.
    function mintWithRewards(
        address recipient,
        uint256 quantity,
        string calldata comment,
        address mintReferral
    ) external payable returns (uint256 tokenId);
}
