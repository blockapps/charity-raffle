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
  
  import { enter } from '../../lottery/lottery_mock';
  
  function* makeParticipateRequest(action) {
    try {
      const response = yield enter(action.admin, action.contract, action.user);
      yield put(participateSuccess(action.key, response));
    }
    catch(err) {
      yield put(participateFailure(action.key, err));
    }
  }
  
  export function* watchParticipate() {
    yield takeEvery(PARTICIPATE_REQUEST, makeParticipateRequest);
  }
  