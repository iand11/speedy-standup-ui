import { Actions, ActionTypes } from './actionTypes';
import { Blocker } from '../types'

export const blockersReducer = (state: Blocker[], action: Actions) => {
  if (action.type === ActionTypes.SET_BLOCKERS) {
    return action.payload;
  }

  return state;
}