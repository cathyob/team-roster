import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Roster from '../screens/Roster';
import AddPlayer from '../screens/AddPlayer';

const App = () => (
  <HashRouter>
    <Route path="/" exact component={props => <Home {...props} />} />
    <Route path="/login" exact component={props => <Login {...props} />} />
    <Route path="/register" exact component={props => <Register {...props} />} />
    <Route path="/roster" exact component={props => <Roster {...props} />} />
    <Route path="/player/new" exact component={props => <AddPlayer {...props} />} />
  </HashRouter>
);

export default App;
