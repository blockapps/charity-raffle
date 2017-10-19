import {
    PARTICIPATE_CLOSE_MODAL,
    PARTICIPATE_OPEN_MODAL,
    PARTICIPATE_REQUEST,
    PARTICIPATE_SUCCESS,
    PARTICIPATE_FAILURE
  } from './participate.actions';
  
  const initialState = {
    modals: {}
  };
  
  
  const reducer = function (state = initialState, action) {
    switch (action.type) {
      case PARTICIPATE_OPEN_MODAL:
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
      case PARTICIPATE_CLOSE_MODAL:
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
      case PARTICIPATE_REQUEST:
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
      case PARTICIPATE_SUCCESS:
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
      case PARTICIPATE_FAILURE:
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
  