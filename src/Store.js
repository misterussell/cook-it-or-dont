// cognito dependencies
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognito from './CognitoConfig';
import User from './models/User';
export default {
  userPool: new CognitoUserPool({
    UserPoolId: cognito.UserPoolId,
    ClientId: cognito.ClientId,
  }),
  user: new User(),
};
