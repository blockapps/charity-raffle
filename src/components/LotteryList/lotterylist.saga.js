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

  function* lotteryListAPICall(isShowAll) {
    return yield call(getOpen, isShowAll);
  }

  function* makeLotteryListRequest(action) {
    try {
      const lotteries = yield lotteryListAPICall(action.isShowAll)
      yield put(lotteryListSuccess(lotteries));
    }
    catch(err) {
      yield put(lotteryListFailure(err));
    }
  }

  export function* watchLotteryList() {
    yield takeEvery(LOTTERY_LIST_REQUEST, makeLotteryListRequest);
  }
