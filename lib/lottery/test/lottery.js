const ba = require('blockapps-rest');
const rest = ba.rest;
const util = ba.common.util;
const config = ba.common.config;

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
  contract.enter = function* () {
    return yield enter(admin, contract);
  }
  return contract;
}

function* compileSearch() {
  rest.verbose('compileSearch', contractName);

  if (yield rest.isCompiled(contractName)) {
    return;
  }
  const searchable = [contractName];
  yield rest.compileSearch(searchable, contractName, contractFilename);
}

// ================== contract methods ====================
function* enter(admin, contract) {
  rest.verbose('enter');
  // function enter() return (bool) {
  const method = 'enter';
  const result = yield rest.callMethod(admin, contract, method);
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
