import { actionTypes } from './actionTypes';

export const blockersReducer = (state, action) => {
  if (action.type === actionTypes.SET_BLOCKERS) {
    return action.payload;
  }

  return state;
}