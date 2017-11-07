import {
    NEW_LOTTERY_CLOSE_MODAL,
    NEW_LOTTERY_OPEN_MODAL,
    NEW_LOTTERY_REQUEST,
    NEW_LOTTERY_SUCCESS,
    NEW_LOTTERY_FAILURE
  } from './newlottery.actions';
  
  const initialState = {
    isOpen: false,
  };
  
  
  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case NEW_LOTTERY_OPEN_MODAL:
        return {
            isOpen: true,
        }
      case NEW_LOTTERY_CLOSE_MODAL:
        return {
            isOpen: false,
        }
      case NEW_LOTTERY_REQUEST:
        return {
          // TODO: Add a loading icon until success or failure
          isOpen: true,
        }
      case NEW_LOTTERY_SUCCESS:
        return {
          isOpen: false,
        }
      case NEW_LOTTERY_FAILURE:
      return {
          isOpen: true,
          failure: action.result,
        }
      default:
        return state;
    }
  }
  
  export default reducer;
  
