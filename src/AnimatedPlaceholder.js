import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AnimatedTextInput from 'react-native-animated-placeholder-textinput';

const AnimatedPlaceholder = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <View>
          <AnimatedTextInput
            placeholder="Email"
            value={email}
            textInputProps={{
              keyboardType: 'email-address',
            }}
            onChangeText={data => setEmail(data)}
          />
        </View>
        <View>
          <AnimatedTextInput
            placeholder="Password"
            value={password}
            textInputProps={{
              keyboardType: 'password',
            }}
            onChangeText={data => setPassword(data)}
          />
        </View>
      </View>
    </View>
  );
};

export default AnimatedPlaceholder;

const styles = StyleSheet.create({});
