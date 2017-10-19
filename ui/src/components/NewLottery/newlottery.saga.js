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

import { uploadContract } from '../../lottery/lottery_mock';

function* makeNewLotteryRequest(action) {
  try {
    const response = yield uploadContract(action.admin, action.args);
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
