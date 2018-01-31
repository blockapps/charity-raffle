//pragma solidity ^0.4.8;

contract Raffle {
  address[] public entries;
  uint public ticketCount;
  uint public ticketPrice;
  string public name;

  uint public winner;
  address public winnerAddress;

  uint public charityPercentage;
  address public initiator;

  function Raffle(string _name, uint _ticketCount, uint _ticketPrice, uint _charityPercentage) {
    // if ticket count < 2 - whats the point
    if (_ticketCount < 2) {
      throw;
    }
    // all good
    name = _name;
    ticketCount = _ticketCount;
    ticketPrice = _ticketPrice;
    charityPercentage = _charityPercentage;
    winnerAddress = 0;
    initiator = msg.sender;
  }

  function enter(uint _numTickets) payable returns (bool) {
    // check if ticket price satisfied
    if (msg.value < ticketPrice * _numTickets) {
      return false;
    }
    // check capacity
    if (entries.length > ticketCount - _numTickets) {
      return false;
    }
    // enter the lottery
    for(uint i=0; i<_numTickets; i++) {
      entries.push(msg.sender);
    }
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
    uint charityAmount = this.balance * charityPercentage / 100;
    winnerAddress.send(this.balance-charityAmount);
    initiator.send(charityAmount);
    return true;
  }
}