import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {SPB_KEY} from '@env';

const PaymentScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text>PaymentScreen</Text>
      <StripeProvider
        publishableKey={SPB_KEY}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      ></StripeProvider>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
