import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import Store from './Store';

import Routes from './Routes';

import reactLogo from './assets/React-icon.png';

const App = (props) => {
  const unauthorizedLinks = props.store.user.isAuthenticated ? null : (
    <div className="unathorized-links">
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
      <li>
        <Link to="/confirm">Confirm</Link>
      </li>
    </div>
  );
  const authorizedLinks = !props.store.user.isAuthenticated ? null : (
    <div className="authorized-links">
      <li>
        <Link to="/myrecipes">My Recipes</Link>
      </li>
      <li>
        <Link to="/addrecipe">New Recipe</Link>
      </li>
    </div>
  )
  return (
    <BrowserRouter>
      <main className="container">
        <div>
          <h1>cook it, or don't.</h1>
          <img className="container__image" alt="react logo" src={reactLogo} />
          <p>Throw some cheese on it.</p>
        </div>
        <ul className="left">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {
            unauthorizedLinks
          }
          {
            authorizedLinks
          }
        </ul>
        <Routes />
      </main>
    </BrowserRouter>
  );
}

export default App;
