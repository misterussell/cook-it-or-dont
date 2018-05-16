import React, { Component } from 'react';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser } from 'amazon-cognito-identity-js';

import cognito from '../CognitoConfig';
const poolData = {
  UserPoolId: cognito.UserPoolId,
  ClientId: cognito.ClientId,
};

const userPool = new CognitoUserPool(poolData);

class SignUp extends Component {
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
         <button onClick={this.handleSubmit}>sign up</button>
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
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('username is ' + result.user.getUsername());
      console.log('call result: ' + result);
    });
  }
}

export default SignUp;
