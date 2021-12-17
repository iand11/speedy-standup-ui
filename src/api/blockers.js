import { get } from "../services/storage";

const BASE_URL = process.env.BASE_URL;

export const getBlockers = async () => {
  const response = await fetch(
   `${BASE_URL}/blocker/get-all`
  );
  const blockers = await response.json();
  return blockers;
};

export const deleteBlocker = async (blockerId) => {
  const token = get("token");
  try {
    const response = await fetch(
      `${BASE_URL}/blocker/${blockerId}`,
      { method: "DELETE", headers: { "token": token } }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const createBlocker = async ({ name, blocker, ticket }) => {
  const token = get("token");
  const body = JSON.stringify({ name: name, blocker: blocker, ticket: ticket });
  try {
    const response = fetch(
      `${BASE_URL}/blocker/create`,
      {
        body,
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        method: "POST",
      }
    );
    return response;
  } catch (err) {
    console.err(err);
  }
};
