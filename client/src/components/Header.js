import React from 'react';

export default ({context}) =>{
    
    const authUser = context.authenticatedUser;

    return (

    <div className="header">
        <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
            {/* Conditional determines if User is logged in and renders options appropriately */}
                {authUser ? (
                <React.Fragment>
                    <span>Welcome, {authUser.userInfo.firstName + ' ' + authUser.userInfo.lastName}!</span>
                    <a href="/signout">Sign Out</a>
                </React.Fragment>
                ) : ( 
                <React.Fragment>
                    <a className="signup" href="/signup">Sign Up</a>
                    <a className="signin" href="/signin">Sign In</a>
                </React.Fragment>
                )}
            </nav>
        </div>
    </div>
    ); 
};