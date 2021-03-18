import React from 'react';

import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';

const Task = ({ _id, title, isDone, removeTask }) => {
  const deleteTask = async () => {
    try {
      await axios.delete('/api/todos/' + _id);
      removeTask(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsDone = async () => {
    try {
      const { data } = await axios.put('/api/todos/' + _id, { title, isDone: true });
      console.log('🚀 ~ file: Task.jsx ~ line 24 ~ markAsDone ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary={title + isDone} />
      <IconButton onClick={deleteTask}>
        <DeleteIcon color="secondary" />
      </IconButton>
      <IconButton onClick={markAsDone}>
        <CheckIcon color="primary" />
      </IconButton>
    </ListItem>
  );
};

export default Task;
