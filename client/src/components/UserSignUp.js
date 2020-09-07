import React from 'react';

export default class UserSignUp extends React.PureComponent{
    
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: ''
      }
    
    render() {
        const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
        } = this.state;

    console.log(this.props.history.location.pathname)

    return(
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
            <div>
                <form onSubmit={this.submit}>
                    <div>
                        <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            placeholder="First Name" 
                            onChange={this.change}
                            value={firstName}/>
                        </div>
                    <div>
                        <input 
                            id="lastName" 
                            name="lastName" 
                            type="text"
                            placeholder="Last Name" 
                            onChange={this.change}
                            value={lastName}/>
                    </div>
                    <div>
                        <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="text" 
                            placeholder="Email Address" 
                            onChange={this.change}
                            value={emailAddress}/>
                        </div>
                    <div>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.change}
                            value={password}/>
                    </div>
                    <div>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            placeholder="Confirm Password"
                            onChange={this.change}
                            value={confirmPassword}/>
                    </div>
                    {
        (this.state.errors)
        ?  <p > {this.state.errors}</p>
        : null
      }
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={this.cancel} href='/'>Cancel</button>
                </div>
            </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <a href="/signin" > Click here</a> to sign in!</p>
        </div>
      </div>
    )
    }


    change =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    };


    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
       
        console.log({context})
        const {
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword
    } = this.state;
    
    if (password === confirmPassword){
        // Create user
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        };
      context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            context.actions.signIn(emailAddress, password)
            .then(() => {
            this.props.history.push('/signup');    
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.history.push('/error');
        });
    } else {
        this.setState({
            errors: 'The passwords must match, please try again'
        })
    } 
    }
    
  
    cancel = (e) => {
        e.preventDefault();
     this.props.history.push('/');
    }
  }
