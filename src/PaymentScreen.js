import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {SPB_KEY} from '@env';
import {CardField, useStripe} from '@stripe/stripe-react-native';

const PaymentScreen = ({navigation}) => {
  const {confirmPayment} = useStripe();

  return (
    <View style={{flex: 1}}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
