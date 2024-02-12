import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import ChatScreen from '../ChatScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MapScreen from '../MapScreen';
import AdmobsScreen from '../AdmobsScreen';
import DynamicScreenA from '../DynamicScreenA';
import ProductDetail from '../ProductDetail';
import ColorMode from '../ColorMode';
import AnimatedPlaceholder from '../AnimatedPlaceholder';
import PaymentScreen from '../PaymentScreen';
import EasyTawlindScreen from '../EasyTawlindScreen';
import SecondTawlindScreen from '../SecondTawlindScreen';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AdmobsScreen"
            component={AdmobsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DynamicScreenA"
            component={DynamicScreenA}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ColorMode"
            component={ColorMode}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AnimatedPlaceholder"
            component={AnimatedPlaceholder}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EasyTawlindScreen"
            component={EasyTawlindScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SecondTawlindScreen"
            component={SecondTawlindScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
