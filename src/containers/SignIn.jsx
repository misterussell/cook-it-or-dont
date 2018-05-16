import React, { Component } from 'react';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser } from 'amazon-cognito-identity-js';

import cognito from '../CognitoConfig';

const poolData = {
  UserPoolId: cognito.UserPoolId,
  ClientId: cognito.ClientId,
};
const userPool = new CognitoUserPool(poolData);
const authenticationData = {
  Username: 'max@misterussell.com',
  Password: 'Newuser1!',
};
const authenticationDetails = new AuthenticationDetails(authenticationData);
const userData = {
  Username: 'max@misterussell.com',
  Pool: userPool,
};
const cognitoUser = new CognitoUser(userData);

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form>
        <p>email:</p>
        <input
           value={this.state.email}
           onChange={e => this.onChange('email', e.target.value)}
           placeholder="email"
        />
        <p>password:</p>
        <input
           value={this.state.password}
           onChange={e => this.onChange('password', e.target.value)}
           placeholder="password"
           type="password"
         />
         <button onClick={this.handleSubmit}>sign in</button>
      </form>
    )
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    console.log(authenticationDetails);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log(result);
        console.log(result.accessToken);
        console.log(result.getAccessToken().getJwtToken());
        console.log(result.idToken);
        console.log(result.refreshToken);
      },
      onFailure: function(err) {
        console.log(err);
      },
    });
  }
}

export default SignIn;
