export const LOTTERY_LIST_REQUEST = 'LOTTERY_LIST_REQUEST';
export const LOTTERY_LIST_SUCCESS = 'LOTTERY_LIST_SUCCESS';
export const LOTTERY_LIST_FAILURE = 'LOTTERY_LIST_FAILURE';
export const TOGGLE_SHOW_COMPLETED = "TOGGLE_SHOW_COMPLETED";
export const RAFFLE_IN_PROGRESS = 'RAFFLE_IN_PROGRESS';
export const SHOW_COMPLETED_RAFFELS = 'SHOW_COMPLETED_RAFFELS';

export const lotteryListRequest = function(value, isDisplayCompletedRaffle) {
  return {
    type: LOTTERY_LIST_REQUEST,
    isShowAll: value,
    isDisplayCompletedRaffle
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

export const toggleShowCompleted = function() {
  return {
    type: TOGGLE_SHOW_COMPLETED,
  }
}

export const raffleInProgess = function() {
  return {
    type: RAFFLE_IN_PROGRESS,
  }
}

export const showCompletedRaffles = function(isDisplayCompletedRaffle) {
  return {
    type: SHOW_COMPLETED_RAFFELS,
    isDisplayCompletedRaffle
  }
}