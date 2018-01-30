import {
  LOTTERY_LIST_SUCCESS, 
  TOGGLE_COMPLETED_RAFFELS,
  TOGGLE_INPROGRESS_RAFFELS 
} from './lotterylist.actions';

const initialState = {
  lotteries: [],
  displayCompleted: true,
  displayInProgress: true,
};


const reducer = function (state = initialState, action) {
  switch (action.type) {
    case LOTTERY_LIST_SUCCESS:
      return {
        ...state,
        lotteries: action.lotteries,
      }
    case TOGGLE_COMPLETED_RAFFELS:
      return {
        ...state,
        displayCompleted: !state.displayCompleted
      }
    case TOGGLE_INPROGRESS_RAFFELS:
      return {
        ...state,
        displayInProgress: !state.displayInProgress
      }
    default:
      return state;
  }
}

export default reducer;
