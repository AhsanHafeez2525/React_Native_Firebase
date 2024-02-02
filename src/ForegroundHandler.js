import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

export default ForegroundHandler = () => {
  useEffect(() => {
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification is foreground', remoteMessage);
      PushNotification.localNotification({
        channelId: 'channel1-id',
        title: 'Android app',
        body: 'test body',
        soundName: 'default',
        vibrate: true,
        playSound: true,
      });
    });
    return unSubscribe;
  }, []);
  return null;
};
