//pragma solidity ^0.4.8;

contract Lottery {
  address[] public entries;
  uint public totalValue;
  uint public maxEntries;
  uint public ticketPrice = 1 ether;

  function Lottery(uint _totalValue) {
    // value must be higher than ticket price
    if (_totalValue < ticketPrice) {
      throw;
    }
    // all good
    totalValue = _totalValue;
    maxEntries = totalValue / ticketPrice;
  }

  function enter() payable returns (bool) {
    // check if ticket price satisfied
    if (msg.value < ticketPrice) {
      return false;
    }
    // check capacity
    if (entries.length >= maxEntries) {
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
