import React from 'react';
import { Route, NavLink, withRouter, Redirect } from 'react-router-dom';
import Login from './Login';
import Quotes from './Quotes';
import './Container.less';

// Make it so `Container` gets the 'magic' props from React Router
export function Container(props) {
  const onLogout = () => {
    // 1- We need to flush token from local storage
    localStorage.removeItem('token');
    // 2- We need to redirect users to login route props.history
    props.history.push("/")
  };

  return (
    <div className='container'>
      <nav>
        <span>
          <NavLink exact to='/'>Login</NavLink>
          <NavLink to='/quotes'>Quotes</NavLink>
        </span>

        <button onClick={onLogout}>Logout</button>
      </nav>

      <main>
        <Route
          exact
          path='/'
          component={Login}
        />

        {/* (OPTION B) Create a secure Route for Quotes.
        Alternatively, we could have the Quotes component
        itself handle the redirect if no token. */}
        <Route
          exact
          path='/quotes'
          render={props => withAuthCheck(Quotes, props)}
        />
      </main>
    </div>
  );
}

function withAuthCheck(Component, props) {
  // if token render component passing props to it
  // otherwise use the Redirect to bounce you away
  if (localStorage.getItem('token')) {
    return <Component {...props} />
  }
  return <Redirect to='/' />
}

export default withRouter(Container);
