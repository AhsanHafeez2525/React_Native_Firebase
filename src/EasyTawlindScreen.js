import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import tw from 'twrnc';

const EasyTawlindScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <TouchableOpacity
        style={tw`bg-teal-500 p-3 rounded-lg shadow-md shadow-gray-400`}>
        <Text style={tw`text-white text-3xl font-bold`}>Hello World</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

export default EasyTawlindScreen;

const styles = StyleSheet.create({});
