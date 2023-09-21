// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IZoraRewardsMint} from "./interfaces/IZoraRewardsMint.sol";
import {ERC6551} from "./utils/ERC6551.sol";
import {Enjoy} from "./utils/Enjoy.sol";

/// @title SmartWalletMinter
/// @notice A contract for minting tokens with rewards and creating token-bound accounts.
contract SmartWalletMinter is Enjoy, ERC6551 {
    /// @notice Mints new tokens with rewards and creates token-bound accounts.
    /// @dev This function calls the `mintWithRewards` function from the IRewardsDrop contract and the `createTokenBoundAccounts` from the ERC6551 contract.
    /// @param _target The address of the ERC721Drop contract to interact with.
    /// @param _to The address to send the minted tokens to.
    /// @param _quantity The number of tokens to mint.
    /// @param _comment A comment to include with the minting transaction.
    /// @param _mintReferral The address for mint referral.
    /// @param _registry The registry address.
    /// @param _implementation The implementation address.
    /// @param _initData The initialization data for creating token-bound accounts.
    /// @return start The starting index for the created token-bound accounts.
    function mintWithRewards(
        address _target,
        address _to,
        uint256 _quantity,
        string memory _comment,
        address _mintReferral,
        address _registry,
        address _implementation,
        bytes memory _initData
    ) public payable returns (uint256 start) {
        IZoraRewardsMint drop = IZoraRewardsMint(_target);
        start =
            drop.mintWithRewards{value: msg.value}(
                _to,
                _quantity,
                _comment,
                _mintReferral
            ) +
            1;
        ERC6551.createTokenBoundAccounts(
            _target,
            start,
            _quantity,
            _registry,
            _implementation,
            _initData
        );
    }
}
