export const LOTTERY_LIST_REQUEST = 'LOTTERY_LIST_REQUEST';
export const LOTTERY_LIST_SUCCESS = 'LOTTERY_LIST_SUCCESS';
export const LOTTERY_LIST_FAILURE = 'LOTTERY_LIST_FAILURE';

export const lotteryListRequest = function() {
  return {
    type: LOTTERY_LIST_REQUEST,
  };
}

export const lotteryListSuccess = function(result) {
  return {
    type: LOTTERY_LIST_SUCCESS,
    lotteries: result,
  };
}

export const lotteryListFailure = function(error) {
  return {
    type: LOTTERY_LIST_FAILURE,
    result: error
  };
}
