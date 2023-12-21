// SPDX-License-Identifier: Apache-2.0

/*
 * Copyright 2020, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

pragma solidity ^0.8.0;

import "../metachain/IMETAToken.sol";
import "../metachain/ReverseMETAToken.sol";
import "../libraries/aeERC20.sol";

contract TestMETACustomToken is aeERC20, IMETAToken {
    address public l2Gateway;
    address public override l1Address;

    modifier onlyGateway() {
        require(msg.sender == l2Gateway, "ONLY_l2GATEWAY");
        _;
    }

    constructor(address _l2Gateway, address _l1Address) {
        l2Gateway = _l2Gateway;
        l1Address = _l1Address;
        aeERC20._initialize("TestCustomToken", "CMETA", uint8(18));
    }

    function someWackyCustomStuff() public {}

    function bridgeMint(address account, uint256 amount) external virtual override onlyGateway {
        _mint(account, amount);
    }

    function bridgeBurn(address account, uint256 amount) external virtual override onlyGateway {
        _burn(account, amount);
    }
}

contract MintableTestMETACustomToken is TestMETACustomToken {
    constructor(address _l2Gateway, address _l1Address)
        TestMETACustomToken(_l2Gateway, _l1Address)
    {}

    function userMint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}

contract ReverseTestMETACustomToken is aeERC20, IMETAToken, ReverseMETAToken {
    address public l2Gateway;
    address public override l1Address;

    modifier onlyGateway() {
        require(msg.sender == l2Gateway, "ONLY_l2GATEWAY");
        _;
    }

    constructor(address _l2Gateway, address _l1Address) {
        l2Gateway = _l2Gateway;
        l1Address = _l1Address;
        aeERC20._initialize("TestReverseCustomToken", "RMETA", uint8(18));
    }

    function someWackyCustomStuff() public {}

    function mint() external {
        _mint(msg.sender, 50000000);
    }
}
