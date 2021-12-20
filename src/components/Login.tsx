import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useComponentContext } from "../context/ComponentContext";
import { loginUser } from '../services/auth';

import "./styles/componentStyles.css";

type Event = React.ChangeEvent<HTMLInputElement>

export const Login = () => {
  const { dispatch, state: { loginError } } = useComponentContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: Event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: Event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    loginUser(email, password, dispatch);
  };

  const helpText = loginError ? 'Incorrect Combination of Email and Password' : ''

  return (
    <div className="login">
      <TextField
        error={loginError}
        className="login--input"
        sx={{ marginBottom: 2 }}
        id="email-input"
        label="Email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        variant="outlined"
      />
      <TextField
        error={loginError}
        className="login--input"
        id="password-input"
        label="Password"
        placeholder="Password"
        value={password}
        type="password"
        onChange={handlePasswordChange}
        variant="outlined"
        helperText={helpText}
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
