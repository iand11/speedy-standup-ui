import { me } from "../api/auth";
import { ActionTypes } from "../reducers/actionTypes";
import { ContextDispatch } from '../context/ComponentContext';

const { SET_IS_AUTHENTICATED, SET_USER } = ActionTypes;

export const checkAuth = async (dispatch: ContextDispatch) => {
  const userInfo = await me();
  type UserInfo = {
    name: string,
    _id: string,
    email: string,
  }
  const { _id, name, email }: UserInfo = userInfo;

  if (_id) {
    dispatch({ type: SET_IS_AUTHENTICATED, payload: true });
    dispatch({ type: SET_USER, payload: { name: name, email, _id } });
  }
};
