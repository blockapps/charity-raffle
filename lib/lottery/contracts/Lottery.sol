//pragma solidity ^0.4.8;

contract Lottery {
  address[] public entries;
  uint public ticketCount;
  uint public ticketPrice;

  uint winner;
  address winnerAddress;

  function Lottery(uint _ticketCount, uint _ticketPrice) {
    // if ticket count < 2 - whats the point
    if (_ticketCount < 2) {
      throw;
    }
    // all good
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
    // payout
    if (entries.length >= ticketCount) {
      return payout();
    }
    return true;
   }

  /* return a random index into entries */
  function rand(uint seed) internal returns (uint) {
    return uint(keccak256(seed)) % entries.length;
  }

  function testRand(uint seed) returns (uint) {
    if (entries.length < 2) {
      return 99999999;
    }
    return rand(seed);
  }

  function payout() internal returns (bool){
    winner = rand(block.number);
    winnerAddress = entries[winner];
    winnerAddress.send(this.balance);
    return true;
  }
}
