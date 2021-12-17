import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useComponentContext } from "../context/ComponentContext";
import { getAllBlockers } from "../services/blockers";
import { createBlocker } from "../api/blockers";

export const InputForm = () => {
  const {
    dispatch,
    state: {
      userInfo: { name: userName },
    },
  } = useComponentContext();

  const [name, setName] = useState(userName || "");
  const [blocker, setblocker] = useState("");
  const [ticket, setTicket] = useState("");

  const addBlocker = async ({ name, blocker, ticket }) => {
    const res = await createBlocker({ name, blocker, ticket });
    res && getAllBlockers(dispatch);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBlockerChange = (event) => {
    setblocker(event.target.value);
  };

  const handleTicketChange = (event) => {
    setTicket(event.target.value);
  };

  const handleClick = () => {
    addBlocker({ name, blocker, ticket });
    setName(userName || "");
    setblocker("");
    setTicket("");
  };

  return (
    <div className="input-form-wrapper">
      <TextField
        sx={{ minWidth: 230 }}
        id="standard-textarea"
        label="Name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        variant="standard"
      />
      <TextField
        sx={{ minWidth: 230 }}
        id="standard-textarea"
        label="Blocker"
        placeholder="Blocker"
        multiline
        value={blocker}
        onChange={handleBlockerChange}
        variant="standard"
      />
      <TextField
        sx={{ minWidth: 230 }}
        id="standard-textarea"
        label="Ticket"
        placeholder="Ticket"
        multiline
        value={ticket}
        onChange={handleTicketChange}
        variant="standard"
      />
      <Button
        onClick={handleClick}
        sx={{ marginLeft: 1, marginTop: 2 }}
        variant="contained"
      >
        Submit
      </Button>
    </div>
  );
};
