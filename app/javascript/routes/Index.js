import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';

console.log('In routes');

export default (
  <Router>
    <Switch>
      <Route path='/' exact component={Home} />
    </Switch>
  </Router>
);
