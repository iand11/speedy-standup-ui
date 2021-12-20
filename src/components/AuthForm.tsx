import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUser, loginUser } from "../services/auth";
import { useComponentContext } from "../context/ComponentContext";

import "./styles/componentStyles.css";

type Event = React.ChangeEvent<HTMLInputElement>

export const AuthForm = () => {
  const errorInitialValues = {
    email: {
      text: '',
      display: false,
    },
    password: {
      text: '',
      display: false
    },
    name: {
      text: '',
      display: false,
    }
  }
  const { dispatch, state: { loginError } } = useComponentContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [signUpErrors, setSignUpErrors] = useState(errorInitialValues)

  const buttonDisabled = !isLogin ? !email || !password || !name : !email || !password;
  const buttonText = isLogin ? "Login" : "Sign Up";
  const toggleButtonText = isLogin ? 'Sign Up' : 'Login';

  const handleEmailChange = (event: Event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: Event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: Event) => {
    setName(event.target.value);
  };

  const handleClick = async () => {
    if (isLogin) {
      loginUser({ email, password, dispatch })
    } else {
      const { data } = await createUser({ email, password, name, dispatch });
      if (data && data.errors) {
        const errorMessages = data.errors.reduce((newObj: object, error: { param: string, msg: string }) => {
          // @ts-ignore
          newObj[error.param] = { text: error.msg, display: true }
          return newObj;
        }, {});
        setSignUpErrors({...errorInitialValues, ...errorMessages})
      }
    }
  };

  const helpText = loginError ? 'Incorrect Combination of Email and Password' : signUpErrors.password.text;

  return (
    <div className="login">
      {!isLogin && <TextField
        error={signUpErrors.name.display}
        className="login--input"
        sx={{ marginBottom: 2 }}
        id="name-input"
        label="Name"
        placeholder="Name"
        value={name}
        type="string"
        onChange={handleNameChange}
        variant="outlined"
        helperText={signUpErrors.name.text}
      />}
      <TextField
        error={signUpErrors.email.display || loginError}
        className="login--input"
        sx={{ marginBottom: 2 }}
        id="email-input"
        label="Email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        variant="outlined"
        helperText={signUpErrors.email.text}
      />
      <TextField
        error={signUpErrors.password.display || loginError}
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
        disabled={buttonDisabled}
        onClick={handleClick}
        className="login--input"
        sx={{ marginTop: 2, height: 40 }}
        variant="contained"
      >
        {buttonText}
      </Button>
      <Button onClick={() => setIsLogin(!isLogin)}>{toggleButtonText}</Button>
    </div>
  );
}