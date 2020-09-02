// Main Container Component

import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from 'react-router-dom';

// Visual Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

// Context
//const HeaderWithContext = withContext(Header);

export default () =>(
  <Router>
    <div>
        <Header />

        <Switch>
        <Redirect exact from="/" to="/courses" />
        <Route exact path="/courses" component={Courses} />
        <Route path="/courses/:id" component={CourseDetail} />
        </Switch>
      </div>

  </Router>

);


