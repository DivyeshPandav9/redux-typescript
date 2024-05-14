import React from 'react';
import { Navigate } from 'react-router-dom';

// Define a generic type `WithAuth` that accepts a `WrappedComponent` of type `P` and returns a function component with the same prop types.
type WithAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => React.FC<P>;

// Define the withAuth function as a generic function with type `P` for props.
const withAuth: WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  // Define the PrivateComponent using the generic `P` for prop types
  const PrivateComponent: React.FC<P> = (props) => {
    // Check for the auth token in local storage
    const auth = localStorage.getItem('token');

    // If there's no auth token, redirect to the login page
    if (!auth) {
      return <Navigate to="/login" />;
    }

    // Otherwise, render the WrappedComponent with the passed props
    return <WrappedComponent {...props} />;
  };

  return PrivateComponent;
};

export default withAuth;





