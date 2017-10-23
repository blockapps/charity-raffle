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

  import {getOpen} from '../../lottery/lottery'

  //const addressZero = '0000000000000000000000000000000000000000';
  //const results = yield rest.query(`${contractName}?winnerAddress=eq.${addressZero}`);

  function* lotteryListAPICall() {
    return yield call(getOpen);
    }

  function* makeLotteryListRequest(action) {
    try {
        console.log('makeLotteryListRequest');
      const lotteries = yield lotteryListAPICall();
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
