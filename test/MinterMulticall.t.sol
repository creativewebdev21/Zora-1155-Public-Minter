// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Test} from "@forge-std/src/Test.sol";
import {MinterMulticall} from "../src/MinterMulticall.sol";
import {ZoraDropMock} from "./mocks/ZoraDropMock.sol";

contract MinterMulticallTest is Test {
    MinterMulticall public adapter;
    ZoraDropMock public drop;
    address public DEFAULT_MINTER = address(0x01);
    address public DEFAULT_MINTER_TWO = address(0x02);
    address public DEFAULT_MINT_REFERRAL = address(0x0333);

    function setUp() public {
        adapter = new MinterMulticall();
        drop = new ZoraDropMock();
    }

    function _assumeUint256(uint256 _num) internal pure {
        vm.assume(_num > 0);
        vm.assume(_num < 100);
    }

    function _assumeAddress(address wallet) internal pure {
        vm.assume(wallet != address(0));
    }
}
