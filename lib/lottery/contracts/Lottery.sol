//pragma solidity ^0.4.8;

contract Lottery {
  address[] public entries;
  uint public ticketCount;
  uint public ticketPrice;

  function Lottery(uint _ticketCount, uint _ticketPrice) {
    ticketCount = _ticketCount;
    ticketPrice = _ticketPrice;
  }

  function enter() payable returns (bool) {
    // check if ticket price satisfied
    if (msg.value < ticketPrice) {
      return false;
    }
    // check capacity
    if (entries.length >= ticketCount) {
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
