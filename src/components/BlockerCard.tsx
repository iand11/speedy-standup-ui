import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import "./styles/componentStyles.css";

type BlockerCardProps = {
  name: string,
  blocker: string,
  ticket: string,
  deleteBlocker: () => void
}

export const BlockerCard = ({ name, blocker, ticket, deleteBlocker }: BlockerCardProps) => {
  return (
    <div className="blocker-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" component="div" sx={{ width: 250 }}>
          {blocker}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{ticket}</Button>
        <IconButton onClick={deleteBlocker} aria-label="delete">
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </div>
  );
};
