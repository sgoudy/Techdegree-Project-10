import React from 'react';

export default class UserSignUp extends React.PureComponent{
    render(){
    return(
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
            <div>
                <form>
                    <div><input 
                    id="firstName" 
                    name="firstName" 
                    type="text" className="" 
                    placeholder="First Name" 
                    value=""   
                    /></div>
                    <div><input 
                    id="lastName" 
                    name="lastName" 
                    type="text" className="" 
                    placeholder="Last Name" 
                    value=""
                    /></div>
                    <div><input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text" 
                    className="" 
                    placeholder="Email Address" 
                    value=""
                    /></div>
                    <div><input 
                    id="password" 
                    name="password" 
                    type="password" 
                    className="" 
                    placeholder="Password" 
                    value=""
                    /></div>
                    <div><input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    className="" 
                    placeholder="Confirm Password"
                    value=""
                    /></div>
            <div className="grid-100 pad-bottom">
                <a className="button" type="submit">Sign Up</a>
                <a className="button button-secondary" onclick="event.preventDefault();" href='/'>Cancel</a>
            </div>
            </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <a href="/signin" > Click here</a> to sign in!</p>
        </div>
      </div>
    )
    }
}