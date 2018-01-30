import {
    LOTTERY_LIST_SUCCESS, TOGGLE_SHOW_COMPLETED, RAFFLE_IN_PROGRESS
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
      case RAFFLE_IN_PROGRESS:
        return {
          ...state,
          showAll: false,
        }
      default:
        return state;
    }
  }

  export default reducer;
