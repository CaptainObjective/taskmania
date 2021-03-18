import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Task from './Task';
import NewTask from './NewTask';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '50%',
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/todos');
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const addTask = newTask => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        {tasks.map(task => (
          <Task key={task._id} {...task} removeTask={removeTask} />
        ))}
      </List>
      <NewTask addTask={addTask} />
    </div>
  );
}
