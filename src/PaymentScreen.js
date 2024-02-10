import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {SPB_KEY} from '@env';
import {CardField, useStripe, createToken} from '@stripe/stripe-react-native';
import ButtonComp from './components/ButtonComp';

const PaymentScreen = ({navigation}) => {
  const {confirmPayment} = useStripe();

  const [cardInfo, setCardInfo] = useState(null);

  const fetchCardDetail = cardDetail => {
    // console.log('my card detail:', cardDetail);
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const onDone = async () => {
    console.log('CardInfoCard', cardInfo);
    if (cardInfo) {
      try {
        const resToken = await createToken({...cardInfo, type: 'Card'});

        console.log('resToken', resToken);
      } catch (error) {
        alert('error token is not created');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
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
        <ButtonComp text="Done" onPress={onDone} disabled={!cardInfo} />
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
