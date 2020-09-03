import React, { Link} from 'react';


export default class Header extends React.PureComponent {
    render() {
    //  const { context } = this.props;
     const authUser = 'Shelby'
    //  const authUser =context.authenticatedUser;
      return (
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
              {authUser ? (
                <React.Fragment>
                    <span>Welcome, {authUser}!</span>
                    <a href="/signout">Sign Out</a>
                </React.Fragment>
              ): null}
            
              {/* ) : ( 
                <React.Fragment>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
                </React.Fragment>
              )} */}
            </nav>
         </div>
         </div>
      );
    }
  };
