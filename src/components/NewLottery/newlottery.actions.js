export const NEW_LOTTERY_OPEN_MODAL = 'NEW_LOTTERY_OPEN_MODAL';
export const NEW_LOTTERY_CLOSE_MODAL = 'NEW_LOTTERY_CLOSE_MODAL';
export const NEW_LOTTERY_REQUEST = 'NEW_LOTTERY_REQUEST';
export const NEW_LOTTERY_SUCCESS = 'NEW_LOTTERY_SUCCESS';
export const NEW_LOTTERY_FAILURE = 'NEW_LOTTERY_FAILURE';

export const newLotteryOpenModal = function() {
  return {
    type: NEW_LOTTERY_OPEN_MODAL,
  };
}

export const newLotteryCloseModal = function() {
  return {
    type: NEW_LOTTERY_CLOSE_MODAL,
  };
}

export const newLotteryCall = function(payload) {
  return {
    type: NEW_LOTTERY_REQUEST,
    payload: payload,
  };
}

export const newLotterySuccess = function(result) {
  return {
    type: NEW_LOTTERY_SUCCESS,
    result: result
  };
}

export const newLotteryFailure = function(error) {
  return {
    type: NEW_LOTTERY_FAILURE,
    result: error
  };
}
