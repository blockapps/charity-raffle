  // TODO :: get lotteryData from sagas
// const allLotteryData = undefined;
// const allLotteryData = [
//   // TODO :: get lotteryData from this.props
//   // const lotteryData = undefined;
//   {
//       address:"0xdeadbeef",
//       name:"Lottery 1",
//       numTickets: 1000,
//       ticketPrice: 1,
//       numSold: 342,
//   },
//   {
//       address:"0x123456789abcdef",
//       name:"Lottery 2",
//       numTickets: 500,
//       ticketPrice: 10,
//       numSold: 7,
//   },
//   {
//       address:"0x07041776",
//       name:"The Electoral College",
//       numTickets: 538,
//       ticketPrice: 1,
//       numSold: 270,
//   },
//   ];

  const uploadUrl = `http://${window.location.hostname}/bloc/v2.2/users/:user/:address/contract?resolve`
  const enterUrl = `http://${window.location.hostname}/bloc/v2.2/users/:username/:userAddress/contract/:contractName/:contractAddress/call?resolve`;
  const lotteryListUrl = `http://${window.location.hostname}/cirrus/search/Lottery?winnerAddress=eq.0000000000000000000000000000000000000000`;
  const lotteryListUrlAll = `http://${window.location.hostname}/cirrus/search/Lottery`;
  const cirrusUrl = `http://${window.location.hostname}/cirrus/search`;
  const compileUrl = `http://${window.location.hostname}/bloc/v2.2/contracts/compile`;

  const contractName = "Lottery";
  const contractSrc = `contract Lottery {
    address[] public entries;
    uint public ticketCount;
    uint public ticketPrice;
    string public name;

    uint public winner;
    address public winnerAddress;

    function Lottery(string _name, uint _ticketCount, uint _ticketPrice) {
      // if ticket count < 2 - whats the point
      if (_ticketCount < 2) {
        throw;
      }
      // all good
      name = _name;
      ticketCount = _ticketCount;
      ticketPrice = _ticketPrice;
      winnerAddress = 0;
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
      for(uint i=0; i<_numTickets; i++)
      {
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
      winnerAddress.send(this.balance);
      return true;
    }
  }`;

export function uploadContract(payload) {
  const url = uploadUrl.replace(":user", payload.username).replace(":address", payload.address);
  const body = JSON.stringify({contract:contractName, value:0, password:payload.password, src:contractSrc, args:payload.args});
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  };
  return fetch(url,options)
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      return response.text()
        .then((msg) => {
          if (msg === "") {
            throw new Error(`Error ${response.status} from POST to ${response.url}`)
          }
          throw new Error(msg)
        });
    })
    .then((json) => {
      isCompiled(json.data.contents.codeHash)
        .then((compiled) => {
          if(compiled) {
            return;
          }

          return compileSearch(contractName, contractSrc);
        })
        .then(() => {
          return json;
        });
    })
    .catch(function(error) {
      throw error;
    });

  //const contract = yield rest.uploadContract(admin, contractName, contractFilename, args);
  //yield compileSearch(contract);
  //contract.src = 'removed';
  //return setContract(admin, contract);
  // console.log('uploadContract');

  // const contract = {
  //   address: args.address,
  //   name: args.name,
  //   numTickets: args.numTickets,
  //   ticketPrice: args.ticketPrice,
  //   numSold: 0,
  // };

  // allLotteryData.push(contract);

  // console.log('Upload Contract');
  // console.log(allLotteryData);

 // return contract;
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

export function isCompiled(codeHash) {
  return fetch(
    `${cirrusUrl}/contract?codeHash=eq.${codeHash}`,
    {
      method: 'GET'
    }
  )
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    return json.length > 0;
  })
  .catch((err) => {
    return false;
  })
}

export function compileSearch() {
  return fetch(
    compileUrl,
    {
      method: 'POST',
      headers: {
        "accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify([
        {
          "contractName": contractName,
          "source": contractSrc,
          "searchable": [contractName]
        }
      ])
    }
  )
  .then((response) => {
    return response.json();
  })
}

// ================== contract methods ====================
export function enter(payload) {
  // console.log('##################################### enter: ', payload);
  const url = enterUrl.replace(':username', payload.username)
                      .replace(':userAddress', payload.userAddress)
                      .replace(":contractName", payload.contractName)
                      .replace(":contractAddress", payload.contractAddress);
  const body = JSON.stringify({
    password: payload.password,
    method: payload.methodName,
    value: payload.value && !isNaN(parseFloat(payload.value)) ? payload.value : 0,
    args: payload.args,
  });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  };
  return fetch(url,options)
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      return response.text()
        .then((msg) => {
          if (msg === "") {
            throw new Error(`Error ${response.status} from POST to ${response.url}`)
          }
          throw msg
        });
    })
    .catch(function(error) {
      throw error;
    });
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
export function getLottery(address) {
  // const results = (yield rest.waitQuery(`${contractName}?address=eq.${address}`, 1, 3*60*1000));
  // if(results.length === 0) {
  //   throw new Error("Not found");
  // }
  // return results[0];
}

export function getOpen(isShowAll) {
  const URL = isShowAll? lotteryListUrlAll:lotteryListUrl
  return fetch(
    URL,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {}
    })
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      throw error;
    });
  //const addressZero = '0000000000000000000000000000000000000000';
  //const results = yield rest.query(`${contractName}?winnerAddress=eq.${addressZero}`);
  //return results;
  // console.log('getOpen');

 // return allLotteryData;
}

// get all lotteries
// get all open lotteries
// upload (string)

// function* getUsers(addresses) {
//   const csv = util.toCsv(addresses); // generate csv string
//   const results = yield rest.query(`${contractName}?address=in.${csv}`);
//   return results;
// }
