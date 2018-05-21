/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader
  eventhough those 2 dependencies are only used in development
  eslint has no way to tell that and outputs an error
*/
import 'babel-polyfill';
// react dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// hot reload for development
import { AppContainer } from 'react-hot-loader';

// appsync dependencies
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import appSyncConfig from './AppSync';

import App from './App';

import './style.scss';

import Store from './Store';

const root = document.getElementById('root');
const authenticate = Store.user.getSession().then(result => console.log(result))
                               .catch(error => console.log(error));
const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    jwtToken: Store.user.getAccessToken(),
  }
});

const render = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Rehydrated>
      <AppContainer>
        <Component store={Store} />
      </AppContainer>
      </Rehydrated>
    </ApolloProvider>,
    root,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
