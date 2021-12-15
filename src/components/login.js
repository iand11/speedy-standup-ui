import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { login } from "../../src/services/auth";
import { set } from "../../src/util/storage";

export const Login = ({ checkAuth }) => {
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
      const { name, email, token } = res;
      set("name", name);
      set("email", email);
      set("token", token);
      checkAuth();
    }
  };

  return (
    <div style={{ width: "30%" }}>
      <TextField
        id="standard-textarea"
        label="Name"
        placeholder="Name"
        value={email}
        onChange={handleEmailChange}
        variant="standard"
      />
      <TextField
        id="standard-textarea"
        label="Name"
        placeholder="Name"
        value={password}
        type="password"
        onChange={handlePasswordChange}
        variant="standard"
      />
      <Button
        onClick={handleClick}
        sx={{ marginLeft: 1, marginTop: 3 }}
        variant="contained"
      >
        Submit
      </Button>
    </div>
  );
};
