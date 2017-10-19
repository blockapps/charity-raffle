export const METHOD_CALL_OPEN_MODAL = 'METHOD_CALL_OPEN_MODAL';
export const METHOD_CALL_CLOSE_MODAL = 'METHOD_CALL_CLOSE_MODAL';
export const METHOD_CALL_REQUEST = 'METHOD_CALL_REQUEST';
export const METHOD_CALL_SUCCESS = 'METHOD_CALL_SUCCESS';
export const METHOD_CALL_FAILURE = 'METHOD_CALL_FAILURE';

export const methodCallOpenModal = function() {
  return {
    type: METHOD_CALL_OPEN_MODAL,
  };
}

export const methodCallCloseModal = function() {
  return {
    type: METHOD_CALL_CLOSE_MODAL,
  };
}

export const methodCall = function(payload) {
  return {
    type: METHOD_CALL_REQUEST,
    payload: payload,
  };
}

export const methodCallSuccess = function(result) {
  return {
    type: METHOD_CALL_SUCCESS,
    result: result
  };
}

export const methodCallFailure = function(error) {
  return {
    type: METHOD_CALL_FAILURE,
    result: error
  };
}
