import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  // Removes Cookies and resets Context to null.
    context.actions.signOut();

    return (
        <Redirect to="/" />
    );
}