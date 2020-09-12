// Main Container Component

import React from 'react';
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
import PrivateRoute from './PrivateRoute';

import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Error from './components/UnhandledError';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);


export default () =>{

     return(

    <Router>
      <div> 
      <HeaderWithContext />

      <Switch>
        <Route exact path ="/" component={CoursesWithContext}/>
        <PrivateRoute exact path ="/courses/create" component={CreateCourseWithContext}/>
        
        <Route exact path ="/signin" component={UserSignInWithContext}/>
        <Route exact path ="/signup" component={UserSignUpWithContext}/>
        <Route exact path ="/signout" component={UserSignOutWithContext}/>
       
        <Route exact path ="/forbidden" component={Forbidden} />
        <Route exact path ="/notfound" component={NotFound} />
        <Route exact path ="/error" component={Error}/>
        
        <Route exact path ="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute exact path ="/courses/:id/update" component={UpdateCourseWithContext}/>
        
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
    
    )
  }