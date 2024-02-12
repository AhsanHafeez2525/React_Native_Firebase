import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const SecondTawlindScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-black ">
      <TouchableOpacity className="bg-teal-500 p-3 rounded-lg shadow-md shadow-gray-400">
        <Text className="text-white text-3xl font-bold ">Hello World</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

export default SecondTawlindScreen;

const styles = StyleSheet.create({});
