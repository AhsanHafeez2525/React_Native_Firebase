import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const HomeScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userSign, setUserSign] = useState(null);

  // free code camp google sign

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken, user} = await GoogleSignin.signIn();
      //   const userInfo = await GoogleSignin.signIn();
      setloggedIn(true);
      // Log the user information
      console.log('User Info:', user);
      console.log('Access Token:', accessToken);
      console.log('ID Token:', idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '189702422957-0sk2egktjddnelchk88n1mcejhm18bib.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

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
        source={require('.././Images/Firenow.jpg')}
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

      <TouchableOpacity
        style={{
          width: 250,
          height: 45,
          alignSelf: 'center',
          backgroundColor: 'black',
          borderRadius: 8,
          marginTop: 20,
        }}
        //   onPress={() => signOut()}
      >
        <Text
          style={{textAlign: 'center', paddingVertical: 11, color: 'white'}}>
          Sign Out
        </Text>
      </TouchableOpacity>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        // onPress={this._signIn}
        onPress={() =>
          signIn()
            .then(() => {
              navigation.navigate('ChatScreen');
              console.log('User signed in using Google');
            })
            .catch(error => {
              console.log(error);
            })
        }
      />
      <View>
        {!loggedIn && <Text>You are currently logged out</Text>}
        {loggedIn && (
          <Button onPress={() => signOut()} title="LogOut" color="red"></Button>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

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
