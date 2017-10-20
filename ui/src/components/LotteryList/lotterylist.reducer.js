import {
    LOTTERY_LIST_REQUEST,
    LOTTERY_LIST_SUCCESS,
    LOTTERY_LIST_FAILURE
  } from './lotterylist.actions';
  
  const initialState = {
    lotteries: [],
  };
  
  
  const reducer = function (state = initialState, action) {
      console.log('lotteryListReducer');
    switch (action.type) {
      case LOTTERY_LIST_SUCCESS:
      console.log('success');
        return {
            lotteries: action.lotteries,
        }
      default:
        return state;
    }
  }
  
  export default reducer;
  
