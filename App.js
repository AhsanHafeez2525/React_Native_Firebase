import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51OfUNeB8XQNXDXaoZIYebF3zFmSFrH78G9C95YfpTmQchcz5siOq2VU482ZqhMb8rsXBKWOwo0GXL1dfb9zRjKUf00V39pPHnW"
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Navigation />
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
