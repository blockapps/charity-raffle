import {
    LOTTERY_LIST_SUCCESS, SHOW_ALL_LOTTERIES
  } from './lotterylist.actions';

  const initialState = {
    lotteries: [],
    showAll: false
  };


  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case LOTTERY_LIST_SUCCESS:
        return {
          ...state,
          lotteries: action.lotteries,
        }
      case SHOW_ALL_LOTTERIES:
        return {
          ...state,
          showAll: action.value,
        }
      default:
        return state;
    }
  }

  export default reducer;
