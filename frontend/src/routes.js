import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';


import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewResult from './pages/NewResult';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes(){
    return (
        <ToastProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <PrivateRoute path="/results/new" exact component={NewResult} />
                    <PrivateRoute path="/dashboard" exact component={Dashboard} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ToastProvider>
    )
}