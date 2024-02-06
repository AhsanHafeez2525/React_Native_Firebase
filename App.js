import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {SPB_KEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  return (
    <StripeProvider
      publishableKey={SPB_KEY}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Navigation />
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
