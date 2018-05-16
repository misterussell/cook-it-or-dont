import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import Store from '../Store';

export default class User {
  signUp(email, password) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    let user = new Promise((resolve, reject) => {
      Store.userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err)
        } else resolve(result.user);
      });
    });
    return user;
  }
};
