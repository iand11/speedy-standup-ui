import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const BasicCard = ({ name, blocker, ticket, deleteBlocker }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 350, border: 'solid black 0.5px', margin: 2 }}>
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
        <IconButton aria-label="delete">
          <DeleteIcon onClick={deleteBlocker} />
        </IconButton>
      </CardActions>
    </Card>
  );
}