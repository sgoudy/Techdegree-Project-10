import React from 'react';

export default class UserSignIn extends React.PureComponent{

    state = {
        emailAddress: '',
        password: '',
        errors: []
      }

    render(){

    const {
        emailAddress,
        password,
        errors
    } = this.state;

    return(

    <div className="bounds">
        <div className="grid-33 centered signin">
            <h1 className="tag">Sign In</h1>
                <div>
                {/* Conditional to show validation errors at top of form upon submission */}
                {
                    ( errors.length)
                    ?
                    <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors"> 
                                <ul>
                                    <li> {errors} </li>
                                </ul>
                                </div> 
                    </div>
                    : null
                }
                    <form onSubmit={this.submit}>  
                        <div>
                            <input
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text" 
                                placeholder="Email Address" 
                                onChange={this.change}
                                value={emailAddress} /> 
                        </div> 
                        <div>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={this.change} />
                        </div>                
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit" >Sign In</button>
                            <button className="button button-secondary" onClick={this.cancel} href='/'>Cancel</button>
                    </div>     
                    </form>    
              </div>
                  <p>&nbsp;</p>
                  <p className="tag">Don't have a user account? 
                  <a href="/signup"> Click here</a> to sign up!
                  </p>
        </div>
    </div>       
    )
    }

    /**
     * Updates state when data is entered
     * @param {event} e 
     */
    change =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    /**
     * Submits User to API for sign-in
     * @param {e} event
     */
    submit =(e)=>{
        e.preventDefault();
        // Retrieve USER context and Course Body
        const { context } = this.props;
        // Redirect User's who are auto routed to Sign-In back to their previous page, else to Main Page.
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
          .then((user) => {
              if (user === null) {
                  this.setState(() => {
                      return { errors: [ 'Sign-in was unsuccessful' ] };
                  });
              } else {
                  this.props.history.push(from);
              }
        })
        .catch((error) => {
            console.error(error);
            this.props.history.push('/error');
        });
    }

    /**
       * Cancels action and returns user to Main Page.
       * @param {event} e 
       */
    cancel = (e)=> {
        e.preventDefault();
        this.props.history.push('/');
    }
}