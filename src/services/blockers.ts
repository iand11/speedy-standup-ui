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
  try {
    const { data: blockers } = await getBlockers();
    console.log('DATA', blockers)
    dispatch({ type: SET_BLOCKERS, payload: blockers });
  } catch (err) {
    console.error(err);
  }
};

export const removeBlocker = async (blockerId: string, dispatch: ContextDispatch, blockers: Blocker[]) => {
  try {
    await deleteBlocker(blockerId);
    const updatedBlockers = blockers.filter(
      (blocker) => blocker._id !== blockerId
    );
    dispatch({ type: SET_BLOCKERS, payload: updatedBlockers });
  } catch (err) {
    console.error(err);
  }
};

export const addBlocker = async ({ name, blocker, ticket, dispatch }: AddBlockerProps) => {
  try {
    await createBlocker({ name, blocker, ticket });
    getAllBlockers(dispatch);
  } catch (err) {
    console.error(err);
  }
};
