import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const LottieScreen = () => {
  return (
    <View>
      <Text>lottieScreen</Text>
      <LottieView
        style={{width: 300, height: 300, alignSelf: 'center'}}
        source={require('../Images/Animation - 1707760366864.json')}
        autoPlay
        loop
      />
      <LottieView
        style={{width: 300, height: 300, alignSelf: 'center'}}
        source={require('../Images/Animation - 1707761004580.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default LottieScreen;

const styles = StyleSheet.create({});
