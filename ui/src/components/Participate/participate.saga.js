import {
    takeEvery,
    put,
    call
  } from 'redux-saga/effects';
  import {
    PARTICIPATE_REQUEST,
    participateSuccess,
    participateFailure,
  } from './participate.actions';
  
  const methodUrl = "bloc/v2.2/users/:username/:userAddress/contract/:contractName/:contractAddress/call?resolve";
  
  function postParticipate(payload) {
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
  
  function* makeParticipateRequest(action) {
    try {
      const response = yield call(postParticipate,action.payload);
      yield put(participateSuccess(JSON.stringify(response, null, 2)));
    }
    catch(err) {
      yield put(participateFailure(err));
    }
  }
  
  export function* watchParticipate() {
    yield takeEvery(PARTICIPATE_REQUEST, makeParticipateRequest);
  }
  