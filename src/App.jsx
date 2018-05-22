import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import Routes from './Routes';

import { Nav } from './containers';

import reactLogo from './assets/React-icon.png';

const App = (props) => {
  return (
    <BrowserRouter>
      <main className="container">
        <div>
          <h1>cook it, or don't.</h1>
          <img className="container__image" alt="react logo" src={reactLogo} />
          <p>Throw some cheese on it.</p>
        </div>
        <Nav user={props.store.user} />
        <Routes />
      </main>
    </BrowserRouter>
  );
}

export default App;
