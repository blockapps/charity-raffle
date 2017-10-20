import {
    takeEvery,
    put,
    call
  } from 'redux-saga/effects';
  import {
    LOTTERY_LIST_REQUEST,
    lotteryListSuccess,
    lotteryListFailure,
  } from './lotterylist.actions';
  
  import {getOpen} from '../../lottery/lottery_mock'
  
  function* makeLotteryListRequest(action) {
    try {
        console.log('makeLotteryListRequest');
      const lotteries = yield getOpen();
      console.log('Make Lottery List Request');
      console.log(lotteries);
      yield put(lotteryListSuccess(lotteries));
    }
    catch(err) {
      yield put(lotteryListFailure(err));
    }
  }
  
  export function* watchLotteryList() {
    yield takeEvery(LOTTERY_LIST_REQUEST, makeLotteryListRequest);
  }
  