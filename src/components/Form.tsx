import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useComponentContext } from "../context/ComponentContext";
import { getAllBlockers, AddBlockerProps } from "../services/blockers";
import { createBlocker } from "../api/blockers";

type Event = React.ChangeEvent<HTMLInputElement>

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

  const addBlocker = async ({ name, blocker, ticket, dispatch }: AddBlockerProps) => {
    const res = await createBlocker({ name, blocker, ticket });
    res && getAllBlockers(dispatch);
  };

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
