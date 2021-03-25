import React from 'react';

import { IconButton, ListItem, ListItemIcon, TextField } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import UndoIcon from '@material-ui/icons/Undo';
import axios from 'axios';

const Task = ({ _id, title, isDone, removeTask, updateTask }) => {
  const deleteTask = async () => {
    try {
      await axios.delete('/api/todos/' + _id);
      removeTask(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDone = async () => {
    try {
      const { data } = await axios.put('/api/todos/' + _id, { title, isDone: !isDone });
      updateTask(_id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTitle = async event => {
    const newTitle = event.target.value;
    try {
      const { data } = await axios.put('/api/todos/' + _id, { title: newTitle, isDone });
      updateTask(_id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <TextField
        onBlur={updateTitle}
        style={{ textDecoration: isDone ? 'line-through' : 'none' }}
        defaultValue={title}
      />
      <IconButton onClick={deleteTask}>
        <DeleteIcon color="secondary" />
      </IconButton>
      <IconButton onClick={toggleDone}>
        {isDone ? <UndoIcon color="primary" /> : <CheckIcon color="primary" />}
      </IconButton>
    </ListItem>
  );
};

export default Task;
