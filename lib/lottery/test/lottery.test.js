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
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);

    const args = {
      _ticketCount: ticketCount,
      _ticketPrice: ticketPrice,
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

    const result = yield contract.enter(ticketPrice);
    assert.isTrue(result, 'entered');
  });

  //reach cap - close loterry
  it('enter - enter an open lottery until capacity', function* () {
    const ticketCount = 3;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    // enter totalValue times
    for (let i = 0; i < ticketCount; i++) {
      const result = yield contract.enter(ticketPrice);
      assert.isTrue(result, 'entered ' + i);
    }
    // should reach capacity
    const result = yield contract.enter(ticketPrice);
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
    const result = yield contract.enter(ticketPrice);
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
    const ticketCount = 3;
    const ticketPrice = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, ticketCount, ticketPrice);

    // check balances
    admin.startBalance = yield rest.getBalance(admin.address);

    const tooMuch = admin.startBalance.plus(10000000000);

    // enter - INSUFFICIENT BALANCE
    let result;
    try {
      result = yield contract.enter(tooMuch);
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

    const tooLittle = ticketPrice.minus(45000000000);

    // enter - below ticket price
    const result = yield contract.enter(tooLittle);
    assert.isFalse(result, 'should be rejected');
  });

});

function* createContract(admin, ticketCount, ticketPrice) {
  const args = {
    _ticketCount: ticketCount,
    _ticketPrice: ticketPrice,
  };
  return yield lotteryJs.uploadContract(admin, args);
}
