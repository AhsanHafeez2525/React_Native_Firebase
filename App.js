import React, {useEffect, useState} from 'react';
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userSign, setUserSign] = useState(null);

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

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserSign(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserSign(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '189702422957-0sk2egktjddnelchk88n1mcejhm18bib.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.f
    });
  }, []);

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

      {userSign != null && <Text>{userSign.user.name}</Text>}
      {userSign != null && <Text>{userSign.user.email}</Text>}
      {userSign != null && (
        <Image
          source={{uri: userSign.user.photo}}
          style={{width: 100, height: 100}}
        />
      )}
      {userSign == null ? (
        <TouchableOpacity
          style={{
            width: 250,
            height: 45,
            // alignSelf: 'center',
            backgroundColor: 'black',
            borderRadius: 8,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          onPress={() => signIn()}>
          <Image
            source={require('./Images/googlelog.png')}
            style={styles.GoogleImage}
          />
          <Text
            style={{textAlign: 'center', paddingVertical: 11, color: 'white'}}>
            Google Sign In
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: 250,
            height: 45,
            alignSelf: 'center',
            backgroundColor: 'black',
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => signOut()}>
          <Text
            style={{textAlign: 'center', paddingVertical: 11, color: 'white'}}>
            Sign Out
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  FireImage: {
    width: 130,
    height: 130,
  },
  GoogleImage: {
    width: 30,
    height: 40,
  },
});
