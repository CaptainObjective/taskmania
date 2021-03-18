import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function Header({ handleLogout }) {
  const classes = useStyles();

  const handleButtonClick = () => {
    axios.defaults.headers.common['Authorization'] = '';
    window.localStorage.setItem('token', null);

    handleLogout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"></IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
          <Button color="inherit" onClick={handleButtonClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
