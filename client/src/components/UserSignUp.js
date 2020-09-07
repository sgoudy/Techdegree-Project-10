import React from 'react';

export default class UserSignUp extends React.PureComponent{
    
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: '',
        passErr: ''
      }
    
    render() {

        const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        passErr,
        errors
        } = this.state;

    return(
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
            <div>

            {
                        (passErr.length || errors.length)
                        ?
                        <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors"> 
                            <ul>
                                <li> {passErr} </li>
                                <li> {errors} </li>
                            </ul>
                            </div> 
                        </div>
                        : null
                    }

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

//TODO create error when Express validation fails
    
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
       
        const {
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword,
          passErr
    } = this.state;
    
    if (password === confirmPassword && password != ''){
      
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            passErr
        };
        this.setState({
            passErr: ''
        });

      context.data.createUser(user)
        .then( errors => {
          
          if (errors.length) {
            this.setState(
                { errors });   
          } else {
            this.setState({
                errors: ''
            });
            context.actions.signIn(emailAddress, password)
            .then(() => {
            this.props.history.push('/');    
            });
          }
        })
      
    } else {
        this.setState({
            passErr: 'The passwords must match, please try again.'
        })
    } 
    }
    
  
    cancel = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
  }
