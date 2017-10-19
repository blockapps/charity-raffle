export const METHOD_CALL_OPEN_MODAL = 'METHOD_CALL_OPEN_MODAL';
export const METHOD_CALL_CLOSE_MODAL = 'METHOD_CALL_CLOSE_MODAL';
export const METHOD_CALL_REQUEST = 'METHOD_CALL_REQUEST';
export const METHOD_CALL_SUCCESS = 'METHOD_CALL_SUCCESS';
export const METHOD_CALL_FAILURE = 'METHOD_CALL_FAILURE';

export const methodCallOpenModal = function(key) {
  return {
    type: METHOD_CALL_OPEN_MODAL,
    key: key
  };
}

export const methodCallCloseModal = function(key) {
  return {
    type: METHOD_CALL_CLOSE_MODAL,
    key: key
  };
}

export const methodCall = function(payload,key) {
  return {
    type: METHOD_CALL_REQUEST,
    payload: payload,
    key: key
  };
}

export const methodCallSuccess = function(result,key) {
  return {
    type: METHOD_CALL_SUCCESS,
    result: result,
    key: key
  };
}

export const methodCallFailure = function(error,key) {
  return {
    type: METHOD_CALL_FAILURE,
    result: error,
    key: key
  };
}
