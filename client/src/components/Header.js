import React, { Link} from 'react';


export default class Header extends React.PureComponent {
    render() {
    //  const { context } = this.props;
    const authUser = 'shelby';
    //  const authUser =context.authenticatedUser;
      return (
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
              {/* {authUser ? (
                <React.Fragment>
                    <span>Welcome, {authUser}!</span>
                    <a href="/signout">Sign Out</a>
                </React.Fragment>
                ) : (  */}
                <React.Fragment>
                  <a className="signup" href="/signup">Sign Up</a>
                  <a className="signin" href="/signin">Sign In</a>
                </React.Fragment>
              {/* )} */}
            </nav>
         </div>
         </div>
      );
    }
  };
