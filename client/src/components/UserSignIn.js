import React, { Component } from 'react';

export default class UserSignIn extends Component{

    state = {
        username: '',
        password: '',
        errors: [],
      }

    render(){

    const {
        emailAddress,
        username,
        password,
        errors
    } = this.state;

    return(

        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
              <div>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text" 
                    className="" 
                    placeholder="Email Address" 
                    value={username}
                />
              </div>
              <div>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    className="" 
                    placeholder="Password" 
                    value=""
                />
              </div>
              <div className="grid-100 pad-bottom">
              <a className="button" type="submit">Sign In</a>
              <a className="button button-secondary" onclick="event.preventDefault();" href='/'>Cancel</a>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? 
            <a href="/signup"> Click here</a> to sign up!
          </p>
        </div>
      </div>       
    )
    }
}

// change =(event)=>{
//     const name = event.target.name;
//     const value = event.target.value;

//     this.setState(() => {
//       return {
//         [name]: value
//       };
//     });
//   }

// submit =()=>{
//     const { context } = this.props;
//     const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
//     const { username, password } = this.state;

//     context.actions.signIn(username, password)
//       .then((user) => {
//         if (user === null) {
//           this.setState(() => {
//             return { errors: [ 'Sign-in was unsuccessful' ] };
//           });
//         } else {
//           this.props.history.push(from);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         this.props.history.push('/error');
//       });
//   }

// cancel = ()=> {
//     this.props.history.push('/');
//   }
