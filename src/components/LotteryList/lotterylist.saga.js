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

  import {getOpen} from '../../raffle/raffle'

  //const addressZero = '0000000000000000000000000000000000000000';
  //const results = yield rest.query(`${contractName}?winnerAddress=eq.${addressZero}`);

  function* lotteryListAPICall(isShowAll, isDisplayCompletedRaffle) {
    return yield call(getOpen, isShowAll, isDisplayCompletedRaffle);
  }

  function* makeLotteryListRequest(action) {
    try {
      const lotteries = yield lotteryListAPICall(action.isShowAll, action.isDisplayCompletedRaffle)
      yield put(lotteryListSuccess(lotteries));
    }
    catch(err) {
      yield put(lotteryListFailure(err));
    }
  }

  export function* watchLotteryList() {
    yield takeEvery(LOTTERY_LIST_REQUEST, makeLotteryListRequest);
  }
