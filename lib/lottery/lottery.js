const ba = require('blockapps-rest');
const rest = ba.rest;
const util = ba.common.util;
const config = ba.common.config;
const BigNumber = ba.common.BigNumber;
const constants = ba.common.constants

const contractName = 'Lottery';
const contractFilename = `./lib/lottery/contracts/Lottery.sol`;

function* uploadContract(admin, args) {
  const contract = yield rest.uploadContract(admin, contractName, contractFilename, args);
  yield compileSearch();
  contract.src = 'removed';
  return setContract(admin, contract);
}

function setContract(admin, contract) {
  contract.getState = function* () {
    return yield rest.getState(contract);
  }
  contract.enter = function* (ticketValue) {
    return yield enter(admin, contract, ticketValue);
  }
  return contract;
}

function* compileSearch() {
  rest.verbose('compileSearch', contractName);
  const searchable = [contractName];
  yield rest.compileSearch(searchable, contractName, contractFilename);
}

// ================== contract methods ====================
function* enter(admin, contract) {
  rest.verbose('enter');
  const state = yield rest.getState(contract);
  const ticketPrice = new BigNumber(state.ticketPrice);

  // function enter() payable return (bool) {
  const method = 'enter';
  const args = {};
  const value = ticketPrice.toFixed();
  const result = yield rest.callMethod(admin, contract, method, args, value);
  const success = (result[0] === true);
  return success;
}



// ================== wrapper methods ====================
function* getLottery(address) {
  const results = (yield rest.waitQuery(`${contractName}?address=eq.${address}`, 1))[0];
  return results;
}

// function* getUsers(addresses) {
//   const csv = util.toCsv(addresses); // generate csv string
//   const results = yield rest.query(`${contractName}?address=in.${csv}`);
//   return results;
// }


module.exports = {
  uploadContract: uploadContract,
  compileSearch: compileSearch,
  //
  getLottery: getLottery,
};
