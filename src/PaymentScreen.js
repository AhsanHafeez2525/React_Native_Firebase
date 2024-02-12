import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';

import {CardField, confirmPayment} from '@stripe/stripe-react-native';
import creatPaymentIntent from './Api/stripeApi';
import ButtonComp from './components/ButtonComp';

const PaymentScreen = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const fetchCardDetail = cardDetail => {
    // console.log("my card details",cardDetail)
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const onDone = async () => {
    let apiData = {
      amount: 500,
      currency: 'INR',
    };

    try {
      const res = await creatPaymentIntent(apiData);
      console.log('payment intent created successfully', res);

      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = await confirmPayment(
          res?.data?.paymentIntent,
          {paymentMethodType: 'Card'},
        );
        console.log('confirmPaymentIntent res++++', confirmPaymentIntent);
        alert('Payment successful...!!!');
      }
    } catch (error) {
      console.error('Error during payment intent:', error);
      alert('Error during payment. Please try again.');
    }
  };

  // const onDone = async () => {
  //   let apiData = {
  //     amount: 500,
  //     currency: 'INR',
  //   };

  //   try {
  //     const res = await creatPaymentIntent(apiData);
  //     console.log('payment intent create succesfully...!!!', res);

  //     if (res?.data?.paymentIntent) {
  //       let confirmPaymentIntent = await confirmPayment(
  //         res?.data?.paymentIntent,
  //         {paymentMethodType: 'Card'},
  //       );
  //       console.log('confirmPaymentIntent res++++', confirmPaymentIntent);
  //       alert('Payment succesfully...!!!');
  //     }
  //   } catch (error) {
  //     console.log('Error rasied during payment intent', error);
  //   }

  //   // console.log("cardInfocardInfocardInfo", cardInfo)
  //   // if (!!cardInfo) {
  //   //     try {
  //   //         const resToken = await createToken({ ...cardInfo, type: 'Card' })
  //   //         console.log("resToken", resToken)

  //   //     } catch (error) {
  //   //         alert("Error raised during create token")
  //   //     }
  //   // }
  // };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 16}}>
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
              fetchCardDetail(cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />

          <ButtonComp onPress={onDone} disabled={!cardInfo} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentScreen;
