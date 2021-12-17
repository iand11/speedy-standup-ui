import { Actions, ActionTypes } from './actionTypes';

export const authReducer = (state: boolean, action: Actions) => {
  if (action.type === ActionTypes.SET_IS_AUTHENTICATED) {
    return action.payload;
  }

  return state;
};
