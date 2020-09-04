// Main Container Component

import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// Visual Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () =>{

     return(

    <Router>
      <div> 
      <HeaderWithContext />

      <Switch>

        <Route exact path="/"  
          render={(props)=>{return <Courses props={props} />}}
          />
            
        <Route path="/courses/create">
            <CreateCourse />
        </Route>

        <Route path="/courses/:id/update" 
        render={(props)=>{return <UpdateCourse props={props} />}}
          />

        <Route path="/courses/:id" 
        render={(props)=>{return <CourseDetail props={props} />}}
          />


        <Route path ="/signin" component={UserSignInWithContext}/>
        <Route path ="/signup" component={UserSignUpWithContext}/>
        <Route path ="/signout" component={UserSignOutWithContext}/>
      </Switch>
      </div>
    </Router>
    
    )
  }