// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {IERC6551Registry} from "lib/ERC6551/src/interfaces/IERC6551Registry.sol";

/// @title ERC6551
/// @notice A contract for creating ERC6551 token-bound accounts.
contract ERC6551 {
    /// @notice Creates a specified number of token-bound accounts starting from a given token ID.
    /// @dev This is an internal function that interacts with the ERC6551 registry to create token-bound accounts.
    /// @param _target The target ERC721 contract address where the token-bound accounts will be created.
    /// @param _startTokenId The token ID to start creating token-bound accounts from.
    /// @param _quantity The number of token-bound accounts to create.
    /// @param _registry The address of the ERC6551 registry contract to use for creating token-bound accounts.
    /// @param _implementation The address of the contract implementation to use for creating token-bound accounts.
    /// @param _initData Initialization data to be used when creating each token-bound account.
    function createTokenBoundAccounts(
        address _target,
        uint256 _startTokenId,
        uint256 _quantity,
        address _registry,
        address _implementation,
        bytes memory _initData
    ) internal {
        IERC6551Registry registry = IERC6551Registry(_registry);
        for (uint256 i = 0; i < _quantity; i++) {
            registry.createAccount(
                _implementation,
                block.chainid,
                _target,
                _startTokenId + i,
                0,
                _initData
            );
        }
    }
}
