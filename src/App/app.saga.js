import {
  takeLatest,
  call
} from 'redux-saga/effects';
import {
  APP_INIT_COMPILE_CONTRACT
} from './app.actions';

import { compileSearch } from '../raffle/raffle';

function* compileLotteryContract(action) {
  try {
    yield call(compileSearch);
  }
  catch (err) {
    // dont do anything
  }
}

export function* watchAppInit() {
  yield takeLatest(APP_INIT_COMPILE_CONTRACT, compileLotteryContract);
}
