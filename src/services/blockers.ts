import { getBlockers, deleteBlocker, createBlocker } from "../api/blockers";
import { ActionTypes } from '../reducers/actionTypes'
import { ContextDispatch } from '../context/ComponentContext';
import { Blocker } from '../types';

const { SET_BLOCKERS } = ActionTypes

export type AddBlockerProps = {
  name: string,
  blocker: string,
  ticket: string,
  dispatch: ContextDispatch
}

export const getAllBlockers = async (dispatch: ContextDispatch) => {
  const blockers = await getBlockers();
  blockers && dispatch({ type: SET_BLOCKERS, payload: blockers });
};

export const removeBlocker = async (blockerId: string, dispatch: ContextDispatch, blockers: Blocker[]) => {
  const res = await deleteBlocker(blockerId);
  const updatedBlockers = blockers.filter(
    (blocker) => blocker._id !== blockerId
  );
  res && dispatch({ type: SET_BLOCKERS, payload: updatedBlockers });
};

export const addBlocker = async ({ name, blocker, ticket, dispatch }: AddBlockerProps) => {
  const res = await createBlocker({ name, blocker, ticket });
  res && getAllBlockers(dispatch);
};
