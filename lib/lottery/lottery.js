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
  yield compileSearch(contract);
  contract.src = 'removed';
  return setContract(admin, contract);
}

function setContract(admin, contract) {
  contract.getState = function* () {
    return yield rest.getState(contract);
  }
  contract.enter = function* (user) {
    return yield enter(admin, contract, user);
  }
  contract.testRand = function* (seed) {
    return yield testRand(admin, contract, seed);
  }
  return contract;
}

function* compileSearch(contract) {
  rest.verbose('compileSearch', contractName);
  if (yield rest_isCompiled(contract)) {
    return;
  }
  const searchable = [contractName];
  yield rest.compileSearch(searchable, contractName, contractFilename);
}

function* rest_isCompiled(contract) {
console.log(contract);
  const results = yield rest.query(`contract?codeHash=eq.${contract.codeHash}`);
  return results.length > 0;
}

// ================== contract methods ====================
function* enter(admin, contract, user) {
  rest.verbose('enter', user);
  const state = yield rest.getState(contract);
  const ticketPrice = new BigNumber(state.ticketPrice);

  // function enter() payable return (bool) {
  const method = 'enter';
  const args = {};
  const value = ticketPrice.toFixed();
  const result = yield rest.callMethod(user, contract, method, args, value);
  const success = (result[0] === true);
  return success;
}

function* testRand(admin, contract, seed) {
  rest.verbose('testRand', seed);
  // function rand(uint seed) internal returns (uint)
  // function testRand(uint seed) returns (uint)
  const method = 'testRand';
  const args = {
    seed: seed,
  };
  const result = yield rest.callMethod(admin, contract, method, args);
  const rand = parseInt(result);
  return rand;
}

// ================== wrapper methods ====================
function* getLottery(address) {
  const results = (yield rest.waitQuery(`${contractName}?address=eq.${address}`, 1, 3*60*1000))[0];
  return results;
}

function* getOpen() {
  const addressZero = '0000000000000000000000000000000000000000';
  const results = yield rest.query(`${contractName}?winnerAddress=eq.${addressZero}`);
  return results;
}

// get all lotteries
// get all open lotteries
// upload (string)

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
  getOpen: getOpen,
};
