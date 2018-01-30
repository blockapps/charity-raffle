import {
  LOTTERY_LIST_SUCCESS, TOGGLE_SHOW_COMPLETED, RAFFLE_IN_PROGRESS, SHOW_COMPLETED_RAFFELS
} from './lotterylist.actions';

const initialState = {
  lotteries: [],
  showAll: false,
  isDisplayCompletedRaffle: false
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
        isDisplayCompletedRaffle: false,
        showAll: !state.showAll,
      }
    case RAFFLE_IN_PROGRESS:
      return {
        ...state,
        isDisplayCompletedRaffle: false,
        showAll: false,
      }
    case SHOW_COMPLETED_RAFFELS:
      return {
        ...state,
        isDisplayCompletedRaffle: true,
      }
    default:
      return state;
  }
}

export default reducer;
