import {
    LOTTERY_LIST_SUCCESS,
  } from './lotterylist.actions';

  const initialState = {
    lotteries: [],
  };


  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case LOTTERY_LIST_SUCCESS:
        return {
            lotteries: action.lotteries,
        }
      default:
        return state;
    }
  }

  export default reducer;
