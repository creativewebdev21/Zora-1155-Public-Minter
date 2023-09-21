// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Enjoy} from "@imagine/Enjoy.sol";
import {PublicMulticall} from "@zora/utils/PublicMulticall.sol";

/// @title MinterMulticall
/// @notice A contract for using multicall on a target Zora 1155.
contract MinterMulticall is Enjoy {
    function multicall(
        address _target,
        bytes[] calldata data
    ) public virtual returns (bytes[] memory results) {
        return PublicMulticall(_target).multicall(data);
    }
}
