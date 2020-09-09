import React from 'react';

export default class UserSignUp extends React.PureComponent{
    
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
      }
    
    render() {

    const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        errors
    } = this.state;

    return(
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
            <div>
                    {
                        (errors.length)
                        ?
                        <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors"> 
                            <ul>
                                {errors.map((error, i) => <li key={i}>{error}</li>)}
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


    /**
     * Updates state when data is entered.
     * @param {event} e 
     */
    change =(e)=>{
        const name = e.target.name;
        const value = e.target.value;
            this.setState(() => {
          return {
            [name]: value
          };
        });
    };


    /**
     * Submits state values to api 
     * @param {event} e 
     */
    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const {
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword
        } = this.state;
    
        if (password === confirmPassword && password !== ''){
            const user = {
                firstName,
                lastName,
                emailAddress,
                password
        };
        context.data.createUser(user)
            .then( errors => {
                if (errors) {
                    this.setState(
                        { errors });   
                } else {
                    this.setState(
                        { errors: [] });
                    context.actions.signIn(emailAddress, password)
                    .then(() => {
                        this.props.history.push(from);    
                    });
                }
            });
        } else {
            this.setState({
                errors: ['Passwords must match.'] 
            });
        } 
    }
    
  
    cancel = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
  }
