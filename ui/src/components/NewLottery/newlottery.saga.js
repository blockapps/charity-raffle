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

import { uploadContract } from '../../lottery/lottery';

//const compileUrl = env.STRATO_URL + "/extabi";
//const blocCompileUrl = env.BLOC_URL + "/contracts/compile";

function* newLotteryAPICall(payload) {
  return yield call(uploadContract,payload);
}

function* makeNewLotteryRequest(action) {
  try {
    const response = yield newLotteryAPICall(action.payload);
    console.log('Make New Lottery Request');
    console.log(response);
    yield put(newLotterySuccess(response));
  }
  catch(err) {
    yield put(newLotteryFailure(err));
  }
}

export function* watchNewLottery() {
  yield takeEvery(NEW_LOTTERY_REQUEST, makeNewLotteryRequest);
}
