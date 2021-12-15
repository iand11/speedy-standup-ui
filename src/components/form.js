import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { get } from '../util/storage';


export function InputForm({ createBlocker }) {
  const userName = get("name");
  const [name, setName] = useState(userName || "");
  const [blocker, setblocker] = useState("");
  const [ticket, setTicket] = useState("");

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
    setTicket("");
    createBlocker({ name, blocker, ticket });
    setName(userName || "");
    setblocker("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-textarea"
          label="Name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Blocker"
          placeholder="Blocker"
          multiline
          value={blocker}
          onChange={handleBlockerChange}
          variant="standard"
        />
        <TextField
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
          sx={{ marginLeft: 1, marginTop: 3 }}
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
