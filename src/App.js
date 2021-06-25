import React, { useState, useEffect } from 'react'

import firebase from './utils/firebase'

//theme
import { ThemeProvider, CircularProgress } from '@material-ui/core'
import theme from './utils/theme'

//components
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup'

//Routers
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
/** Router */
import PrivateRoute from './routers/PrivateRoute'
import PublicRoute from './routers/PublicRoute'

import Home from './components/Pages/Home/Home';

function App() {

  const [values, setValues] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: {}
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const db = firebase.firestore();
        db.collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            setValues({ user: doc.data()})
          });
        setValues({ isAuthenticated: true, isLoading: false });
      } else {
        // No user is signed in.
        setValues({ isAuthenticated: false, isLoading: false });
      }
      console.log("useEffect", user);
    });
    return () => {
      setValues({}); // This worked for me
    };
  }, [])

  if (values.isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        height: '100vh',
        width: '100vw'
      }}>
        <CircularProgress color="primary" size={200} />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
          <PublicRoute
            component={Login}
            path="/login"
            isAuthenticated={values.isAuthenticated}
            restricted={true}
          />
          <PublicRoute
            component={Signup}
            path="/Signup"
            isAuthenticated={values.isAuthenticated}
            restricted={true}
          />
          <PrivateRoute
            component={Home}
            path="/home"
            isAuthenticated={values.isAuthenticated}
          >
            <Home userProfile={values.user}/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
