import {
    METHOD_CALL_CLOSE_MODAL,
    METHOD_CALL_OPEN_MODAL,
    METHOD_CALL_REQUEST,
    METHOD_CALL_SUCCESS,
    METHOD_CALL_FAILURE
  } from './participate.actions';
  
  const initialState = {
    modals: {}
  };
  
  
  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case METHOD_CALL_OPEN_MODAL:
        return {        
            modals: {
            ...state.modals,
            [action.key] : {
                ...state.modals[action.key],
                isOpen: true,
                result: 'Waiting for method to be called...'
              }
          }
        }
      case METHOD_CALL_CLOSE_MODAL:
        return {        
          modals: {
          ...state.modals,
          [action.key] : {
              ...state.modals[action.key],
              isOpen: false,
              result: 'Waiting for method to be called...'
            }
        }
      }
      case METHOD_CALL_REQUEST:
        return {        
          modals: {
          ...state.modals,
          [action.key] : {
              ...state.modals[action.key],
              isOpen: false,
              result: 'Waiting for method to be called...'
            }
        }
      }
      case METHOD_CALL_SUCCESS:
        return {        
          modals: {
          ...state.modals,
          [action.key] : {
              ...state.modals[action.key],
              isOpen: false,
              result: 'Waiting for method to be called...'
            }
        }
      }
      case METHOD_CALL_FAILURE:
        return {        
          modals: {
          ...state.modals,
          [action.key] : {
              ...state.modals[action.key],
              isOpen: false,
              result: 'Waiting for method to be called...'
            }
        }
      }
      default:
        return state;
    }
  }
  
  export default reducer;
  