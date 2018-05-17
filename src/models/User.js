import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import Store from '../Store';

export default class User {

  accessToken: null;
  idToken: null;
  refreshToken: null;
  isAuthenticated: false;

  signUp(email, password) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    return new Promise((resolve, reject) => {
      Store.userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else resolve(result.user);
      });
    });
  }

  confirmAccount(email, code) {
    const userData = {
      Username: email,
      Pool: Store.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else resolve(result);
      });
    });
  }

  signIn(email, password) {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: email,
      Pool: Store.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          console.log(result.getAccessToken().getJwtToken());
          console.log(result);
          resolve(this.setCredentials({
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
            }));
        },
        onFailure: function(error) {
          reject(error);
        },
      })
    });
  }

  getSession() {
    const cognitoUser = Store.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser !== null) {
        cognitoUser.getSession((error, result) => {
          if (error) reject(error);
          if (result) {
            resolve(this.setCredentials({
                accessToken: result.getAccessToken().getJwtToken(),
                idToken: result.getIdToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken(),
              }));
          };
        });
      } else {
        reject('no user');
      }
    });
  }

  setCredentials(tokens){
    this.accessToken = tokens.accessToken;
    this.idToken = tokens.idToken;
    this.refreshToken = tokens.refreshToken;
    this.isAuthenticated = true;
    return tokens;
  }
};
