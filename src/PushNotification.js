import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('old fcm token', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        console.log('new generated fcm token', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const NotificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open background state',
      remoteMessage.notification,
    );
    handleNotification(remoteMessage);
  });

  // foreground message

  // messaging().onMessage(async remoteMessage => {
  //   console.log('Notification is foreground', remoteMessage);
  //   handleNotification(remoteMessage);
  // });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state',
          remoteMessage.notification,
        );
        handleNotification(remoteMessage);
      }
    });
};

const handleNotification = remoteMessage => {
  const {title, body} = remoteMessage.notification;

  Alert.alert(
    title,
    body,
    [
      {text: 'Clear', onPress: () => clearNotification(remoteMessage)},
      {text: 'OK', onPress: () => console.log('Notification Pressed')},
    ],
    {cancelable: false},
  );
};

const clearNotification = remoteMessage => {
  // Implement clearing logic here if needed
  console.log('Notification cleared:', remoteMessage);
};
