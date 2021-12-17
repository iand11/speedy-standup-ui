import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login } from "../api/auth";
import { set } from "../services/storage";
import { useComponentContext } from "../context/componentContext";
import { actionTypes } from "../reducers/actionTypes";

import "./styles/componentStyles.css";

export const Login = () => {
  const { dispatch } = useComponentContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const res = await login(email, password);
    if (res) {
      const { token } = res;
      set("token", token);
      dispatch({ type: actionTypes.SET_IS_AUTHENTICATED, payload: true });
    }
  };

  return (
    <div className="login">
      <TextField
        className="login--input"
        sx={{ marginBottom: 2 }}
        id="outlined-basic"
        label="Email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        variant="outlined"
      />
      <TextField
        className="login--input"
        id="outlined-basic"
        label="Password"
        placeholder="Password"
        value={password}
        type="password"
        onChange={handlePasswordChange}
        variant="outlined"
      />
      <Button
        onClick={handleClick}
        className="login--input"
        sx={{ marginTop: 2, height: 40 }}
        variant="contained"
      >
        Login
      </Button>
    </div>
  );
};
