import {
    LOTTERY_LIST_SUCCESS, TOGGLE_SHOW_COMPLETED
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
      case TOGGLE_SHOW_COMPLETED:
        return {
          ...state,
          showAll: !state.showAll,
        }
      default:
        return state;
    }
  }

  export default reducer;
