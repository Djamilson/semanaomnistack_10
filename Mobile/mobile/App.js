import React from 'react';
import {YellowBox, StatusBar} from 'react-native';
import 'react-native-gesture-handler';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from '~/routes';
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}
