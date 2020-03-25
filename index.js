import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import firebase from 'firebase/app';

//Firebase Configurations
const firebaseConfig = {
  apiKey: 'AIzaSyCPet9r1P_A5MNe9UqnJGgD8QMkYhNXCOM',
  authDomain: 'maligai.firebaseapp.com',
  databaseURL: 'https://maligai.firebaseio.com',
  projectId: 'maligai',
  storageBucket: 'maligai.appspot.com',
  messagingSenderId: '149718995484',
  appId: '1:149718995484:web:05574fb3728151341905d9',
  measurementId: 'G-0WERPSC7BK',
};

firebase.initializeApp(firebaseConfig);

//Apollo Configurations
const httpLink = new HttpLink({
  uri: 'https://maligai.herokuapp.com/v1/graphql',
});

const webSocketLink = new WebSocketLink({
  uri: 'wss://maligai.herokuapp.com/v1/graphql',
});

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  webSocketLink,
  httpLink,
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({}),
});

const Main = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Main);
