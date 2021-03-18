import { Container, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import TaskList from './TaskList';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

function App() {
  const classes = useStyles();
  const jwtToken = window.localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(jwtToken));

  if (isLoggedIn) {
    axios.defaults.headers.common['Authorization'] = jwtToken;
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header>
        <Header handleLogout={handleLogout}></Header>
      </header>
      <main>
        <Container className={classes.root}>
          {isLoggedIn ? <TaskList /> : <LoginForm handleLogin={handleLogin} />}
        </Container>
      </main>
    </div>
  );
}

export default App;
