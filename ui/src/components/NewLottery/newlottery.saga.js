import {
    takeEvery,
    put,
    call
  } from 'redux-saga/effects';
  import {
    NEW_LOTTERY_REQUEST,
    newLotterySuccess,
    newLotteryFailure,
  } from './newlottery.actions';
  
  const methodUrl = "#";
  //env.BLOC_URL + "/users/:username/:userAddress/contract/:contractName/:contractAddress/call?resolve";
  
  function postMethodCall(payload) {
    return fetch(
      methodUrl
        .replace(':username', payload.username)
        .replace(':userAddress', payload.userAddress)
        .replace(":contractName", payload.contractName)
        .replace(":contractAddress", payload.contractAddress),
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: payload.password,
          method: payload.methodName,
          value: payload.value && !isNaN(parseFloat(payload.value)) ? parseFloat(payload.value) : 0,
          args: payload.args
        })
      })
      .then(function(response) {
        return response.json();
      })
      .catch(function(error) {
        throw error;
      });
  }
  
  function* methodCall(action) {
    try {
      const response = yield call(postMethodCall,action.payload);
      yield put(newLotterySuccess(JSON.stringify(response, null, 2)));
    }
    catch(err) {
      yield put(newLotteryFailure(err));
    }
  }
  
  export function* watchMethodCall() {
    yield takeEvery(NEW_LOTTERY_REQUEST, methodCall);
  }
  