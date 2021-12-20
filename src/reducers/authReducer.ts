import { Actions, ActionTypes } from './actionTypes';
const { SET_IS_AUTHENTICATED, SET_AUTH_ERROR } = ActionTypes;

export const authenticatedReducer = (state: boolean, action: Actions) => {
  if (action.type === SET_IS_AUTHENTICATED) {
    return action.payload;
  }

  return state;
}

export const authErrorReducer = (state: boolean, action: Actions) => {
  if (action.type === SET_AUTH_ERROR) {
    return action.payload;
  }

  return state;
}
