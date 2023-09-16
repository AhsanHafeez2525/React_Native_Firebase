import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(JSON.stringify(res));
        Alert.alert('User Logged In' + JSON.stringify(res));
      })
      .catch(error => {
        console.log('There is no user according to this email');
      });
  };

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('./Images/Firenow.jpg')}
        style={styles.FireImage}
      />
      <TextInput
        placeholder="Enter a email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={{
          width: '90%',
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 8,
          paddingLeft: 20,
        }}
      />
      <TextInput
        placeholder="Enter a password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={{
          width: '90%',
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 8,
          marginTop: 15,
          paddingLeft: 20,
        }}
      />
      <TouchableOpacity
        style={{
          width: 250,
          height: 45,
          alignSelf: 'center',
          backgroundColor: 'black',
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => createUser()}>
        <Text
          style={{textAlign: 'center', paddingVertical: 11, color: 'white'}}>
          Create an Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 250,
          height: 45,
          alignSelf: 'center',
          backgroundColor: 'black',
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => userSignIn()}>
        <Text
          style={{textAlign: 'center', paddingVertical: 11, color: 'white'}}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  FireImage: {
    width: 130,
    height: 130,
  },
});
