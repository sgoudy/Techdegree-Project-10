// Main Container Component

import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';

// Visual Components
import Header from './components/Header';
import Courses from './components/Courses';

// Context
//const HeaderWithContext = withContext(Header);

export default () =>(
<Router>
  <div>
      <Header />
      <Switch>
        <Route exact path ="/" component={Courses} />
      </Switch>
    </div>

</Router>

);


