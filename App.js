import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {SPB_KEY} from '@env';

const App = () => {
  alert(SPB_KEY);
  return <Navigation />;
};

export default App;

const styles = StyleSheet.create({});
