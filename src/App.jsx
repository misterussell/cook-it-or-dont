import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import Routes from './Routes';

import reactLogo from './assets/React-icon.png';

const App = () => (
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
        <li>
          <Link to="/addrecipe">New Recipe</Link>
        </li>
        <li>
          <Link to="/recipes">All Recipes</Link>
        </li>
      </ul>
      <Routes />
    </main>
  </BrowserRouter>
);

export default App;
