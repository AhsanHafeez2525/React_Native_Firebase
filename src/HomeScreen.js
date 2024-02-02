import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next';
import {NotificationServices, requestUserPermission} from './PushNotification';
import ForegroundHandler from './ForegroundHandler';

Settings.initializeSDK();
Settings.setAppID('281964017953662');

const HomeScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userSign, setUserSign] = useState(null);

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [userData, setUserData] = useState({});

  const facebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  const facebookLogout = async () => {
    try {
      await auth().signOut();
      LoginManager.logOut();
      setUserData({});
      console.log('User Logout Success');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

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
      navigation.navigate('ChatScreen');
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

  useEffect(() => {
    requestUserPermission();
    NotificationServices();
  }, []);

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
        style={{width: 192, height: 48, marginTop: 20}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      <View style={{marginTop: 15}}>
        {!loggedIn && <Text>You are currently logged out</Text>}
        {loggedIn && (
          <Button
            onPress={() => signOut()}
            title="Sign Out"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Facebook Login</Text>
        <View>
          <Text>
            UID: <Text style={styles.title}>{userData?.uid}</Text>
          </Text>
          <Text>
            Email: <Text style={styles.title}>{userData?.email}</Text>
          </Text>
          <Text>
            User Name: <Text style={styles.title}>{userData?.displayName}</Text>
          </Text>
        </View>
        <Pressable
          onPress={() =>
            facebookLogin()
              .then(res => {
                console.log(res);
                setUserData(res.user);
              })
              .catch(error => console.log(error))
          }
          style={styles.fbBtn}>
          <Text style={styles.btnTitle}>Facebook Login</Text>
        </Pressable>
        <Pressable onPress={facebookLogout} style={styles.fbBtn}>
          <Text style={styles.btnTitle}>Facebook Logout</Text>
        </Pressable>
      </View>
      <ForegroundHandler />
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  fbBtn: {
    backgroundColor: '#1399F130',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnTitle: {
    fontSize: 22,
    color: '#1399F1',
  },
});
