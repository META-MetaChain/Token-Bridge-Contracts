pragma solidity ^0.8.0;

contract METASysMock {
    event METASysL2ToL1Tx(address from, address to, uint256 value, bytes data);
    uint256 counter;

    function sendTxToL1(address destination, bytes calldata calldataForL1)
        external
        payable
        returns (uint256 exitNum)
    {
        exitNum = counter;
        counter = exitNum + 1;
        emit METASysL2ToL1Tx(msg.sender, destination, msg.value, calldataForL1);
        return exitNum;
    }
}
