require('co-mocha');
const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const config = common.config;
const util = common.util;
const should = common.should;
const assert = common.assert;
const Promise = common.Promise;

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

  it('enter - enter an open lottery until capacity', function* () {
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

  //reach cap - close loterry
  //participate - in a closed lottery


});

function* createContract(admin, totalValue) {
  const args = {
    _totalValue: totalValue,
  };
  return yield lotteryJs.uploadContract(admin, args);
}
