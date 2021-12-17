import { getBlockers, deleteBlocker, createBlocker } from "../api/blockers";
import { actionTypes } from '../reducers/actionTypes'

const { SET_BLOCKERS } = actionTypes

export const getAllBlockers = async (dispatch) => {
  const blockers = await getBlockers();
  blockers && dispatch({ type: SET_BLOCKERS, payload: blockers });
};

export const removeBlocker = async (blockerId, dispatch, blockers) => {
  const res = await deleteBlocker(blockerId);
  const updatedBlockers = blockers.filter(
    (blocker) => blocker._id !== blockerId
  );
  res && dispatch({ type: SET_BLOCKERS, payload: updatedBlockers });
};

export const addBlocker = async ({ name, blocker, ticket }) => {
  const res = await createBlocker({ name, blocker, ticket });
  res && getAllBlockers();
};
