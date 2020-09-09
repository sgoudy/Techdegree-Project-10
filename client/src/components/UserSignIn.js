import React from 'react';

export default class UserSignIn extends React.PureComponent{

  state = {
      emailAddress: '',
      password: '',
      errors: []
    }

  render(){

    console.log(this.props)

  const {
      emailAddress,
      password,
      errors
  } = this.state;

  return(

  <div className="bounds">
    <div className="grid-33 centered signin">
    <h1>Sign In</h1>
      <div>
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
      <p>Don't have a user account? 
        <a href="/signup"> Click here</a> to sign up!
      </p>
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
  }

  submit =(e)=>{
    e.preventDefault();
    const { context } = this.props;
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
//TODO redirect this
      .catch((error) => {
        console.error(error);
        this.props.history.push('/errors');
      });
  }

  cancel = (e)=> {
    e.preventDefault();
    this.props.history.push('/');
  }
}