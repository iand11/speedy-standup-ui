import { get } from "../services/storage";
const BASE_URL = process.env.BASE_URL

export const login = async (email, password) => {
  const body = JSON.stringify({ email: email, password: password });
  try {
    const response = await fetch(
      `${BASE_URL}/user/login`,
      {
        body,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
      }
    );
    const auth = await response.json();
    return auth;
  } catch (err) {
    console.err(err);
  }
};

export const me = async () => {
  const token = get("token");
  try {
    const response = await fetch(
      `${BASE_URL}/user/me`,
      {
        method: "GET",
        headers: {
          token: token,
        },
      }
    );
    const me = await response.json();
    return me;
  } catch (err) {
    console.error(err);
  }
};
