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

import { uploadContract } from '../../raffle/raffle';
import { setUserMessage } from '../UserMessage/user-message.action'

//const compileUrl = env.STRATO_URL + "/extabi";
//const blocCompileUrl = env.BLOC_URL + "/contracts/compile";

function* newLotteryAPICall(payload) {
  return yield call(uploadContract,payload);
}

function* makeNewLotteryRequest(action) {
  try {
    const response = yield newLotteryAPICall(action.payload);
    yield put(newLotterySuccess(response));
    yield put(setUserMessage('Successfully created the raffle'));
  }
  catch(err) {
    yield put(newLotteryFailure(err.message));
    //yield put(setUserMessage('Error: Something went wrong'));
  }
}

export function* watchNewLottery() {
  yield takeEvery(NEW_LOTTERY_REQUEST, makeNewLotteryRequest);
}
