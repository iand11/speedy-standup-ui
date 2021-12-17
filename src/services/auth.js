import { me } from "../api/auth";
import { actionTypes } from "../reducers/actionTypes";

const { SET_IS_AUTHENTICATED, SET_USER } = actionTypes;

export const checkAuth = async (dispatch) => {
  const userInfo = await me();
  const { _id: id, name, email } = userInfo;

  if (id) {
    dispatch({ type: SET_IS_AUTHENTICATED, payload: true });
    dispatch({ type: SET_USER, payload: { name, email, id } });
  }
};
