require('co-mocha');
const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const config = common.config;
const util = common.util;
const should = common.should;
const assert = common.assert;
const Promise = common.Promise;
const BigNumber = ba.common.BigNumber;
const constants = ba.common.constants

const lotteryJs = require('../lottery');
//const ErrorCodes = rest.getEnums(`${config.libPath}/common/ErrorCodes.sol`).ErrorCodes;

const adminName = util.uid('Admin');
const adminPassword = '1234';

describe('Lottery tests', function() {
  this.timeout(config.timeout);

  let admin;

  before(function* () {
    admin = yield rest.createUser(adminName, adminPassword);
  });

/* function Lottery(uint _totalValue) { */

  it('Create Contract - constructor arguments', function* () {
    const ticketCount = 5;
    const ticketPrice = new BigNumber(1234567890).mul(constants.ETHER);

    const args = {
      _ticketCount: ticketCount,
      _ticketPrice: ticketPrice.toFixed(),
    };

    const contract = yield lotteryJs.uploadContract(admin, args);
    // state
    {
      const lottery = yield contract.getState();
      assert.equal(lottery.ticketCount, ticketCount, 'ticketCount');
      assert.equal(lottery.ticketCount, ticketCount, 'ticketCount');
    }
    // query
    {
      const lottery = yield lotteryJs.getLottery(contract.address);
      assert.equal(lottery.ticketCount, ticketCount, 'ticketCount');
      assert.equal(lottery.ticketCount, ticketCount, 'ticketCount');
    }
  });

  //enter - send money - see that it went in
  it('enter - enter an open lottery', function* () {
    const ticketCount = 10;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    const username = util.uid('User');
    const user = yield rest.createUser(username, adminPassword);

    const result = yield contract.enter(user);
    assert.isTrue(result, 'entered');

    const state = yield contract.getState();
    assert.equal(user.address, state.entries[0]);
  });

  //reach cap - close loterry
  it('enter - enter an open lottery until capacity', function* () {
    const ticketCount = 3;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    // enter totalValue times
    for (let i = 0; i < ticketCount; i++) {
      const result = yield contract.enter(admin);
      assert.isTrue(result, 'entered ' + i);
    }
    // should reach capacity
    const result = yield contract.enter(admin);
    assert.isFalse(result, 'should reach capacity');
  });

  it('enter - transfer value', function* () {
    const ticketCount = 3;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    // check balances
    admin.startBalance = yield rest.getBalance(admin.address);
    contract.startBalance = yield rest.getBalance(contract.address);

    // enter
    const result = yield contract.enter(admin);
    assert.isTrue(result, 'entered');

    // check balances
    admin.endBalance = yield rest.getBalance(admin.address);
    admin.delta = admin.endBalance.minus(admin.startBalance).mul(-1);
    admin.delta.should.be.bignumber.gt(ticketPrice);

    contract.endBalance = yield rest.getBalance(contract.address);
    contract.delta = contract.endBalance.minus(contract.startBalance);
    contract.delta.should.be.bignumber.equal(ticketPrice);
  });

  it('enter - transfer value - INSUFFICIENT BALANCE', function* () {
    // check balances
    admin.startBalance = yield rest.getBalance(admin.address);

    const ticketCount = 3;
    const ticketPrice = admin.startBalance.plus(12340000000);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    // enter - INSUFFICIENT BALANCE
    let result;
    try {
      result = yield contract.enter(admin);
    } catch(error) {
      assert.isTrue(error.name.includes('HttpError'));
      assert.equal(error.status, '400');
    }
    // if didnt throw - error
    assert.isUndefined(result, 'call should have thrown INSUFFICIENT BALANCE, and not return a result');
  });

  it('enter - transfer value - below ticket price', function* () {
    const ticketCount = 3;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    // function enter() return (bool) {
    const method = 'enter';
    const args = {};
    const value = ticketPrice.minus(66600000).toFixed();
    const result = yield rest.callMethod(admin, contract, method, args, value);
    const success = (result[0] === true);
    assert.isFalse(success, 'should be rejected');
  });

  it('rand tester', function* () {
    const ticketCount = 3;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    const noWay = yield contract.testRand();
    assert.isAtLeast(noWay, 999999, 'premature call should abort');

    for (let i = 0; i < ticketCount; i++) {
      const result = yield contract.enter(admin);
      assert.isTrue(result, 'entered ' + i);
    }

    const rand = yield contract.testRand();
    assert.isAtLeast(rand, 0, 'above 0');
    assert.isAtMost(rand, ticketCount, 'within range');
  });

  it.skip('rand tester (multiple sample)', function* () {
    const ticketCount = 10;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    for (let i = 0; i < ticketCount; i++) {
      const result = yield contract.enter(admin);
      assert.isTrue(result, 'entered ' + i);
    }

    const dist = Array.apply(null, {
      length: ticketCount
    }).map(function(item, index) {
      return 0;
    });
    for (let i = 0; i < ticketCount * 10; i++) {
      const rand = yield contract.testRand(i);
      assert.isAtLeast(rand, 0, 'above 0');
      assert.isAtMost(rand, ticketCount, 'within range');
      dist[rand]++;
    }
    console.log(dist);
  });

  it.only('enter - for the win', function* () {
    const ticketCount = 10;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);
    const uid = util.uid();

    const userNames = Array.apply(null, {
      length: ticketCount,
    }).map(function(item, index) {
      return 'User_' + uid + '_' + index;
    });

    const users = [];
    for (let i = 0; i < userNames.length; i++) {
      // create user
      const user = yield rest.createUser(userNames[i], adminPassword);
      users.push(user);
      // record balance for winner check
      user.balanceStart = yield rest.getBalance(user.address);
      // enter
      const result = yield contract.enter(user);
      assert.isTrue(result, 'entered ' + user.username);
    }

    const prize = ticketPrice.mul(ticketCount);
    const estimatedFees = 100000;
    const estimatedPrize = prize.minus(estimatedFees);
    let winners = 0;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      user.balanceEnd = yield rest.getBalance(user.address);
      const delta = user.balanceEnd.minus(user.balanceStart);
      const expected = estimatedPrize.minus(ticketPrice);
      if (delta.gt(expected)) { //
        winners++;
      }
    }
    const state = yield contract.getState();
    console.log(state);
    assert.equal(winners, 1, 'one and only one');
  });

});

function* createContract(admin, ticketCount, ticketPrice) {
  const args = {
    _ticketCount: ticketCount,
    _ticketPrice: ticketPrice.toFixed(),
  };
  return yield lotteryJs.uploadContract(admin, args);
}
