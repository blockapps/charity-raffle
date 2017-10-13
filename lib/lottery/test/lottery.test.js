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

const lotteryJs = require('./lottery');
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

  it.skip('Create Contract - constructor arguments', function* () {
    const totalValue = 100;

    const args = {
      _totalValue: totalValue,
    };

    const contract = yield lotteryJs.uploadContract(admin, args);
    // state
    {
      const lottery = yield contract.getState();
      assert.equal(lottery.totalValue, totalValue, 'totalValue');
    }
    // query
    {
      const lottery = yield lotteryJs.getLottery(contract.address);
      assert.equal(lottery.totalValue, totalValue, 'totalValue');
    }
  });

  //enter - send money - see that it went in
  it('enter - enter an open lottery', function* () {
    const totalValue = 10;
    const contract = yield createContract(admin, totalValue);

    const result = yield contract.enter();
    assert.isTrue(result, 'entered');
  });

  //reach cap - close loterry
  it.skip('enter - enter an open lottery until capacity', function* () {
    const totalValue = 2;
    const contract = yield createContract(admin, totalValue);

    // enter totalValue times
    for (let i = 0; i < totalValue; i++) {
      const result = yield contract.enter();
      assert.isTrue(result, 'entered ' + i);
    }
    // should reach capacity
    const result = yield contract.enter();
    assert.isFalse(result, 'should reach capacity');
  });

  it('enter - transfer value', function* () {
    const totalValue = new BigNumber(2).mul(constants.ETHER);
    const ticketValue = new BigNumber(1).mul(constants.ETHER);
    const contract = yield createContract(admin, totalValue);

    // check balances
    admin.startBalance = yield rest.getBalance(admin.address);
    contract.startBalance = yield rest.getBalance(contract.address);

    // enter
    const result = yield contract.enter();
    assert.isTrue(result, 'entered');

    // check balances
    admin.endBalance = yield rest.getBalance(admin.address);
    admin.delta = admin.endBalance.minus(admin.startBalance).mul(-1);
    admin.delta.should.be.bignumber.gt(ticketValue);

    contract.endBalance = yield rest.getBalance(contract.address);
    contract.delta = contract.endBalance.minus(contract.startBalance);
    contract.delta.should.be.bignumber.equal(ticketValue);
  });

});

function* createContract(admin, totalValue) {
  const args = {
    _totalValue: totalValue,
  };
  return yield lotteryJs.uploadContract(admin, args);
}
