import {
  CognitoUser,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import Store from '../Store';

export default class User {
  signUp(email, password) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    const user = new Promise((resolve, reject) => {
      Store.userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else resolve(result.user);
      });
    });
    return user;
  }

  confirmAccount(email, code) {
    const userData = {
      Username: email,
      Pool: Store.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    const confirmation = new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else resolve(result);
      });
    });
    return confirmation;
  }
};
