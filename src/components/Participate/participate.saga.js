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

import { enter } from '../../raffle/raffle';
import { setUserMessage } from '../UserMessage/user-message.action'

function* participateAPICall(payload) {
    return yield call(enter, payload);
  }

  function* makeParticipateRequest(action) {
    try
    {
      const response = yield call(participateAPICall,action.payload);
      yield put(participateSuccess(action.key, response));
      yield put(setUserMessage('Successfully acquired the tickets'));
    }
    catch(err) {
      yield put(participateFailure(action.key, err));
      //yield put(setUserMessage('Error: Something went wrong'));
    }
  }

  export function* watchParticipate() {
    yield takeEvery(PARTICIPATE_REQUEST, makeParticipateRequest);
  }
