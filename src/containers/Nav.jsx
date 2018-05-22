import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const signOut = () => {
    console.log('clicked');
    props.user.signOut();
  }
  const authorizedLinks = props.user.isAuthenticated
    ? (
      <div className="authorized-links">
        <li>
          <Link to="/myrecipes">My Recipes</Link>
        </li>
        <li>
          <Link to="/addrecipe">New Recipe</Link>
        </li>
        <li>
          <span onClick={signOut}>Sign Out</span>
        </li>
      </div>
      )
    : (
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
  return (
    <nav className="nav">
      <ul className="left">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        {
          authorizedLinks
        }
      </ul>
    </nav>
  )
}

export default Nav;
