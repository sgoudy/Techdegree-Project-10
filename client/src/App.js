// Main Container Component

import React, {Component} from 'react';
import {
  Route,
  Switch,
  Redirect
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


// Context
//const HeaderWithContext = withContext(Header);

export default class App extends Component {

  state={
    courses: [],
    courseDetail:[]
  }

  coursesUpdate=(props)=>{
    this.setState({
      courses: props,
      courseDetail: null
    })
  }

  courseDetailUpdate=(props)=>{
    this.setState({
      courses: null,
      courseDetail: props
    })
  };

   

  componentDidUpdate(){
    console.log(this.state);
  }

  render(){
    return(

 
    <div> 
      <Header />

      <Switch>

        <Route exact path="/">
            <Courses onUpdate={this.coursesUpdate}/>
        </Route>

        <Route path="/courses/create">
            <CreateCourse />
        </Route>

        <Route path="/courses/:id/update" >
          <UpdateCourse course={this.state}/>
        </Route>

        <Route path="/courses/:id">
            <CourseDetail onUpdate={this.courseDetailUpdate} />
        </Route>

        


        
         

        <Route path ="/signin" component={UserSignIn}/>
        <Route path ="/signup" component={UserSignUp}/>
        <Route path ="/signout" component={UserSignOut}/>
      </Switch>
    </div>
    )
  }
   
}