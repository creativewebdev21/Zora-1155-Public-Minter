// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Test} from "@forge-std/src/Test.sol";
import {PublicMinter} from "../src/PublicMinter.sol";
import {ZoraDropMock} from "./mocks/ZoraDropMock.sol";
import {ERC6551RegistryMock} from "./mocks/ERC6551RegistryMock.sol";

contract PublicMinterTest is Test, ERC6551RegistryMock {
    PublicMinter public adapter;
    ZoraDropMock public drop;
    address public DEFAULT_MINTER = address(0x01);
    address public DEFAULT_MINTER_TWO = address(0x02);
    address public DEFAULT_MINT_REFERRAL = address(0x0333);

    function setUp() public {
        adapter = new PublicMinter();
        drop = new ZoraDropMock();
        _setupErc6551();
    }

    function testPurchase(address _to, uint256 _quantity) public {
        _assumeUint256(_quantity);
        _assumeAddress(_to);
        assertEq(drop.balanceOf(_to), 0);
        uint256 _start = adapter.mintWithRewards(
            address(drop),
            _to,
            _quantity,
            "smart wallet created",
            DEFAULT_MINT_REFERRAL,
            address(erc6551Registry),
            address(erc6551Implementation),
            INIT_DATA
        );
        assertEq(drop.balanceOf(_to), _quantity);
        assertEq(drop.ownerOf(_start), _to);
    }

    function testPurchaseMany(uint256 _quantity, address _to) public {
        vm.assume(_to != DEFAULT_MINTER);
        vm.assume(_to != DEFAULT_MINTER_TWO);
        testPurchase(DEFAULT_MINTER, _quantity);
        testPurchase(DEFAULT_MINTER_TWO, _quantity);
        testPurchase(_to, _quantity);
    }

    function testRegistry(uint256 _quantity, address _to) public {
        _assumeUint256(_quantity);

        // No ERC6551 before purchase
        for (uint256 i = 1; i <= _quantity; i++) {
            address tokenBoundAccount = getTBA(address(drop), i);
            assertTrue(!isContract(tokenBoundAccount));
        }

        testPurchase(_to, _quantity);

        // All tokens have ERC6551 after purchase
        for (uint256 i = 1; i <= _quantity; i++) {
            address tokenBoundAccount = getTBA(address(drop), i);
            assertTrue(isContract(tokenBoundAccount));
        }
    }

    function _assumeUint256(uint256 _num) internal pure {
        vm.assume(_num > 0);
        vm.assume(_num < 100);
    }

    function _assumeAddress(address wallet) internal pure {
        vm.assume(wallet != address(0));
    }
}
