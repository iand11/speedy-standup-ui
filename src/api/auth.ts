import axios from 'axios';
import { get } from "../services/storage";
const BASE_URL = process.env.BASE_URL

export type CreateArgs = {
  name: string;
  email: string;
  password: string;
}

type LoginArgs = {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginArgs) => {
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

export const create = ({ name, email, password }: CreateArgs) => {
  const body = JSON.stringify({ name, email, password });
  const url = `${BASE_URL}/user/signup`;

  return axios({
    method: "POST",
    url,
    data: body,
    headers: {
      "Content-Type": "application/json"
    }
  })
}
