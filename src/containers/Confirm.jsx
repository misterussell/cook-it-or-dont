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
var userData = {
  Username : 'max@misterussell.com',
  Pool : userPool,
};
var cognitoUser = new CognitoUser(userData);

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmation: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form>
        <p>confirmation:</p>
        <input
           value={this.state.confirmation}
           onChange={e => this.onChange('confirmation', e.target.value)}
           placeholder="confirmation code"
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
    const confirmation = this.state.confirmation.trim();
    cognitoUser.confirmRegistration(confirmation, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
    });
  }
}

export default Confirm;
