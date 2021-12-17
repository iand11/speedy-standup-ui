import { actionTypes } from './actionTypes';

export const userInfoReducer = (state, action) => {
  if (action.type === actionTypes.SET_USER) {
    return action.payload
  }

  return state;
};
