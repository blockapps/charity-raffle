import {
  takeLatest
} from 'redux-saga/effects';
import {
  APP_INIT_COMPILE_CONTRACT
} from './app.actions';

import {compileSearch} from '../lottery/lottery';

function* compileLotteryContract(action) {
  try {
    yield compileSearch();
  }
  catch(err) {
    // dont do anything
  }
}

export function* watchAppInit() {
  yield takeLatest(APP_INIT_COMPILE_CONTRACT, compileLotteryContract);
}
