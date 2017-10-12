pragma solidity ^0.4.8;

contract Lottery {
    address[] public entries;
    uint public numEntries;
    uint public totalValue;
    
    function Lottery(uint _totalValue) {
        totalValue = _totalValue;
        numEntries = 0;
    }
    
    function enterLottery() payable {
        entries.push(msg.sender);
        numEntries++;
        
        if(this.balance > totalValue) {
            payout();
        }
    }
    
    function payout() internal {
        uint winner = uint(keccak256(entries)) % numEntries;
        entries[winner].send(this.balance);
    }
}