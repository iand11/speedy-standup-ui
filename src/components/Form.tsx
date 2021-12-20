import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useComponentContext } from "../context/ComponentContext";
import { addBlocker } from "../services/blockers";

type Event = React.ChangeEvent<HTMLInputElement>

export const InputForm = () => {
  const {
    dispatch,
    state: {
      userInfo: { name: userName },
    },
  } = useComponentContext();

  const [name, setName] = useState(userName);
  const [blocker, setblocker] = useState("");
  const [ticket, setTicket] = useState("");

  const handleNameChange = (event: Event) => {
    setName(event.target.value);
  };

  const handleBlockerChange = (event: Event) => {
    setblocker(event.target.value);
  };

  const handleTicketChange = (event: Event) => {
    setTicket(event.target.value);
  };

  const handleClick = () => {
    addBlocker({ name, blocker, ticket, dispatch });
    setName(userName || "");
    setblocker("");
    setTicket("");
  };

  return (
    <div className="input-form-wrapper">
      <TextField
        sx={{ minWidth: 230 }}
        id="name-input"
        label="Name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        variant="standard"
      />
      <TextField
        sx={{ minWidth: 230 }}
        id="blocker-input"
        label="Blocker"
        placeholder="Blocker"
        multiline
        value={blocker}
        onChange={handleBlockerChange}
        variant="standard"
      />
      <TextField
        sx={{ minWidth: 230 }}
        id="ticket-input"
        label="Ticket"
        placeholder="Ticket"
        multiline
        value={ticket}
        onChange={handleTicketChange}
        variant="standard"
      />
      <Button
        id="submit-button"
        onClick={handleClick}
        sx={{ marginLeft: 1, marginTop: 2 }}
        variant="contained"
      >
        Submit
      </Button>
    </div>
  );
};
