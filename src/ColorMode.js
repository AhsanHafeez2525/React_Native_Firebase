import React from 'react';
import {StyleSheet, Text, View, Switch, StatusBar} from 'react-native';
import {useColorScheme} from 'nativewind';

const ColorMode = ({navigation}) => {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorScheme == 'dark' ? '#111' : '#fff',
      }}>
      <StatusBar
        barStyle={colorScheme == 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: colorScheme == 'dark' ? 'white' : 'black',
          }}>
          Dark Mode
        </Text>
        <Switch
          value={colorScheme == 'dark'}
          onValueChange={toggleColorScheme}
        />
      </View>

      <Text
        style={{
          marginHorizontal: 20,
          textAlign: 'justify',
          color: colorScheme == 'dark' ? 'white' : 'black',
        }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Text>
      <View
        style={{
          height: 48,
          width: '100%',
          backgroundColor: colorScheme == 'dark' ? '#006400' : '#87CEEB',
        }}
      />
    </View>
  );
};

export default ColorMode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: 'black',
  },
});
