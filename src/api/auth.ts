import axios from 'axios';
import { get } from "../services/storage";
const BASE_URL = process.env.BASE_URL

export const login = async (email: string, password: string) => {
  const body = JSON.stringify({ email: email, password: password });
  const url = `${BASE_URL}/user/login`;
  return axios({
    method: 'POST',
    url,
    data: body,
    headers: {
      "Content-Type": "application/json"
    }
  })
};

export const me = async () => {
  const token = get("token");
  const url = `${BASE_URL}/user/me`
  return axios({
    method: 'GET',
    url,
    headers: {
      token
    }
  });
};
