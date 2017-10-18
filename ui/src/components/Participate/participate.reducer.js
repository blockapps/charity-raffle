import {
    METHOD_CALL_CLOSE_MODAL,
    METHOD_CALL_OPEN_MODAL,
    METHOD_CALL_REQUEST,
    METHOD_CALL_SUCCESS,
    METHOD_CALL_FAILURE
  } from './participate.actions';
  
  const initialState = {
    isOpen: false,
  };
  
  
  const reducer = function (state = initialState, action) {
      console.log(action);
    switch (action.type) {
      case METHOD_CALL_OPEN_MODAL:
        console.log('reducer called');
        return {
            isOpen: true,
        }
      case METHOD_CALL_CLOSE_MODAL:
        return {
            isOpen: false,
        }
      case METHOD_CALL_REQUEST:
        return {
          isOpen: false,
        }
      case METHOD_CALL_SUCCESS:
        return {
          isOpen: false,
        }
      case METHOD_CALL_FAILURE:
        return {
          isOpen: false,
        }
      default:
        return state;
    }
  }
  
  export default reducer;
  