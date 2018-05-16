/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader
  eventhough those 2 dependencies are only used in development
  eslint has no way to tell that and outputs an error
*/

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

const root = document.getElementById('root');
const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    jwtToken: 'jwtToken',
  }
});

const render = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Rehydrated>
      <AppContainer>
        <Component />
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
