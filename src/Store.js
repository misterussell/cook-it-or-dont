// cognito dependencies
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognito from './CognitoConfig';
import User from './models/User';
import Recipe from './models/Recipe';

export default {
  userPool: new CognitoUserPool({
    UserPoolId: cognito.UserPoolId,
    ClientId: cognito.ClientId,
  }),
  user: new User(),
  recipe: new Recipe(),
};
