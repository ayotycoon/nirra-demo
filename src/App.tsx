import React from 'react';
import logo from './logo.svg';
import './App.scss';

import {BrowserRouter, Link, Redirect, Route, Router, Switch} from 'react-router-dom'
import Login from './components/pages/unAuthenticated/Login/Login';
import Dashboard from './components/pages/authenticated/Dashboard/Dashboard';
import Register from './components/pages/unAuthenticated/Register/Register';

function App() {
  return (
    <BrowserRouter>
    

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
       

        <Redirect path="/" to='login'/>
      </Switch>
  
  </BrowserRouter>
  );
}

export default App;
