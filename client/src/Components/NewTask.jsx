import React from 'react';
import { createStyles, IconButton, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

const NewTask = ({ addTask }) => {
  const classes = useStyles();

  const handleClick = async () => {
    try {
      const { data } = await axios.post('/api/todos', { title: 'New task...' });
      addTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" onClick={handleClick}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default NewTask;
