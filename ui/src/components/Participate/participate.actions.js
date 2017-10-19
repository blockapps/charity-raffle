export const PARTICIPATE_OPEN_MODAL = 'PARTICIPATE_OPEN_MODAL';
export const PARTICIPATE_CLOSE_MODAL = 'PARTICIPATE_CLOSE_MODAL';
export const PARTICIPATE_REQUEST = 'PARTICIPATE_REQUEST';
export const PARTICIPATE_SUCCESS = 'PARTICIPATE_SUCCESS';
export const PARTICIPATE_FAILURE = 'PARTICIPATE_FAILURE';

export const participateOpenModal = function(key) {
  return {
    type: PARTICIPATE_OPEN_MODAL,
    key: key
  };
}

export const participateCloseModal = function(key) {
  return {
    type: PARTICIPATE_CLOSE_MODAL,
    key: key
  };
}

export const participateRequest = function(payload,key) {
  return {
    type: PARTICIPATE_REQUEST,
    payload: payload,
    key: key
  };
}

export const participateSuccess = function(result,key) {
  return {
    type: PARTICIPATE_SUCCESS,
    result: result,
    key: key
  };
}

export const participateFailure = function(error,key) {
  return {
    type: PARTICIPATE_FAILURE,
    result: error,
    key: key
  };
}
