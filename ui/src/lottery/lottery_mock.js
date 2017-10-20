  // TODO :: get lotteryData from sagas
// const allLotteryData = undefined;
const allLotteryData = [
  // TODO :: get lotteryData from this.props
  // const lotteryData = undefined;
  {
      address:"0xdeadbeef",
      name:"Lottery 1",
      numTickets: 1000,
      ticketPrice: 1,
      numSold: 342,
  },
  {
      address:"0x123456789abcdef",
      name:"Lottery 2",
      numTickets: 500,
      ticketPrice: 10,
      numSold: 7,
  },      
  {
      address:"0x07041776",
      name:"The Electoral College",
      numTickets: 538,
      ticketPrice: 1,
      numSold: 270,
  },
  ];

export function* uploadContract(admin, args) {
  //const contract = yield rest.uploadContract(admin, contractName, contractFilename, args);
  //yield compileSearch(contract);
  //contract.src = 'removed';
  //return setContract(admin, contract);
  console.log('uploadContract');

  const contract = {
    address: args.address,
    name: args.name,
    numTickets: args.numTickets,
    ticketPrice: args.ticketPrice,
    numSold: 0,
  };

  allLotteryData.push(contract);

  console.log('Upload Contract');
  console.log(allLotteryData);

  return contract;
}

export function setContract(admin, contract) {
  //contract.getState = function* () {
  //  return yield rest.getState(contract);
  //}
  //contract.enter = function* (user) {
  //  return yield enter(admin, contract, user);
  //}
  //contract.testRand = function* (seed) {
  //  return yield testRand(admin, contract, seed);
  //}
  //return contract;
  console.log('setContract');
}

function* compileSearch(contract) {
  //rest.verbose('compileSearch', contractName);
  //if (yield rest.isCompiled(contract.codeHash)) {
  //  return;
  //}
  //const searchable = [contractName];
  //yield rest.compileSearch(searchable, contractName, contractFilename);
  console.log('compileSearch');
}

// ================== contract methods ====================
export function* enter(admin, contract, user) {
  //rest.verbose('enter', user);
  //const state = yield rest.getState(contract);
  //const ticketPrice = new BigNumber(state.ticketPrice);

  //// function enter() payable return (bool) {
  //const method = 'enter';
  //const args = {};
  //const value = ticketPrice.toFixed();
  //const result = yield rest.callMethod(user, contract, method, args, value);
  //const success = (result[0] === true);
  //return success;
  console.log('enter');

  return true;
}

export function* testRand(admin, contract, seed) {
  //rest.verbose('testRand', seed);
  // function rand(uint seed) internal returns (uint)
  // function testRand(uint seed) returns (uint)
  //const method = 'testRand';
  //const args = {
  //  seed: seed,
  //};
  //const result = yield rest.callMethod(admin, contract, method, args);
  //const rand = parseInt(result);
  //return rand;
}

// ================== wrapper methods ====================
export function* getLottery(address) {
  //const results = (yield rest.waitQuery(`${contractName}?address=eq.${address}`, 1, 3*60*1000))[0];
  //return results;
  console.log('getLottery');
}

export function* getOpen() {
  //const addressZero = '0000000000000000000000000000000000000000';
  //const results = yield rest.query(`${contractName}?winnerAddress=eq.${addressZero}`);
  //return results;
  console.log('getOpen');

  return allLotteryData;
}

// get all lotteries
// get all open lotteries
// upload (string)

// function* getUsers(addresses) {
//   const csv = util.toCsv(addresses); // generate csv string
//   const results = yield rest.query(`${contractName}?address=in.${csv}`);
//   return results;
// }
