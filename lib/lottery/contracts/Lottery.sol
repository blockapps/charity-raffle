//pragma solidity ^0.4.8;

contract Lottery {
    address[] public entries;
    /*uint public numEntries;*/
    uint public totalValue;

    function Lottery(uint _totalValue) {
        totalValue = _totalValue;
        /*numEntries = 0;*/
    }

    function enter() returns (bool) {
      // check capacity
      if (entries.length >= totalValue) {
        return false;
      }
      // enter the lottery
      entries.push(msg.sender);
      return true;
        /*if(this.balance > totalValue) {
            payout();
        }*/
    }
/*
    function payout() internal {
        uint winner = uint(keccak256(entries)) % numEntries;
        entries[winner].send(this.balance);
    }*/
}
