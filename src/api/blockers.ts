import axios from 'axios';
import { get } from "../services/storage";
const BASE_URL = process.env.BASE_URL

type CreateBlockerProps = {
  name: string,
  blocker: string,
  ticket: string,
}

export const getBlockers = async () => {
  const url = `${BASE_URL}/blocker/get-all`
  return axios(url)
};

export const deleteBlocker = async (blockerId: string) => {
  const token = get("token");
  const url = `${BASE_URL}/blocker/${blockerId}`;
  return axios({
    method: "DELETE",
    headers: {
      token
    },
    url
  })
};

export const createBlocker = async ({ name, blocker, ticket }: CreateBlockerProps) => {
  const token = get("token");
  const data = JSON.stringify({ name: name, blocker: blocker, ticket: ticket });

  const url = `${BASE_URL}/blocker/create`;
  return axios({
    method: "POST",
    url,
    headers: {
      token,
      "Content-Type": "application/json",
    },
    data,
  })
};
