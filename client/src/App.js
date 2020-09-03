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
    courseDetail: []
  }

  coursesUpdate=(props)=>{
    this.setState({
      courses: props,
      courseDetail: null
    }, this.componentDidUpdate)
  }

  courseDetailUpdate=(props)=>{
    this.setState({
      courses: null,
      courseDetail: props
    }, this.componentDidUpdate)
  }

  componentDidUpdate(){
    
  }

  render(){

   

    return(

 
    <div> 
      <Header />

      <Switch>
        <Redirect exact from="/" to="/courses" />

        <Route exact path="/courses">
            <Courses onUpdate={this.coursesUpdate}/>
        </Route>

        <Route exact path="/courses/:id">
            <CourseDetail onUpdate={this.courseDetailUpdate} />
        </Route>

        <Route exact path="/courses/:id/update" >
          <UpdateCourse data={this.state}/>
        </Route>

//TODO fix here
        <Route exact path="/courses/create" >
          <CreateCourse />
        </Route>
// TODO to here
        <Route path ="/signin" component={UserSignIn}/>
        <Route path ="/signup" component={UserSignUp}/>
        <Route path ="/signout" component={UserSignOut}/>
      </Switch>
    </div>
    )
  }
   
}