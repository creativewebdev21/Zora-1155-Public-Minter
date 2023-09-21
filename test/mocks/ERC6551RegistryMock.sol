// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {ERC6551Registry} from "lib/ERC6551/src/ERC6551Registry.sol";
import {Account} from "lib/tokenbound/src/Account.sol";
import {AccountGuardian} from "lib/tokenbound/src/AccountGuardian.sol";
import {EntryPoint} from "lib/account-abstraction/contracts/core/EntryPoint.sol";

contract ERC6551RegistryMock {
    bytes INIT_DATA = bytes("0x8129fc1c");

    // ERC6551
    ERC6551Registry erc6551Registry;
    AccountGuardian guardian;
    EntryPoint entryPoint;
    Account erc6551Implementation;

    function _setupErc6551() internal {
        erc6551Registry = new ERC6551Registry();
        guardian = new AccountGuardian();
        entryPoint = new EntryPoint();
        erc6551Implementation = new Account(
            address(guardian),
            address(entryPoint)
        );
    }

    function isContract(address _addr) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }

    function getTBA(
        address _target,
        uint256 tokenId
    ) internal view returns (address) {
        address payable tokenBoundAccount = payable(
            erc6551Registry.account(
                address(erc6551Implementation),
                block.chainid,
                _target,
                tokenId,
                0
            )
        );
        return tokenBoundAccount;
    }
}
