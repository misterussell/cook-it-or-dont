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
    Store.userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        response = false;
      }
      console.log(`username is ${result.user.getUsername()}`);
      console.log(result.user);
      return true;
    });
  }
};
