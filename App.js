// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   Alert,
//   Button,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Navigations from './src/Navigation';
// import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
// import SendMsg from './Images/SendMsg.svg';
// import BackArrow from './Images/backArrow.svg';
// import firestore from '@react-native-firebase/firestore';
// // import {useRoute} from '@react-navigation/native';

// const App = ({navigation}) => {
//   const [messages, setMessages] = useState([]);

//   // const route = useRoute();

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = messageArray => {
//     console.log(messageArray);
//     const msg = messageArray[0];
//     const myMsg = {...msg, senderId: 1, recieverId: 2};
//     setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
//     firestore()
//       .collection('Chats')
//       .doc('12345')
//       .collection('messages')
//       .add({
//         ...myMsg,
//         createdAt: new Date(),
//       });
//   };

//   return (
//     <View style={{flex: 1}}>
//       <GiftedChat
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//       />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
// });

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const App = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
    const querySnapShot = firestore()
      .collection('Chats')
      .doc('12345')
      .collection('messages')
      .orderBy('createdAt', 'desc');
    querySnapShot.onSnapshot(snapShot => {
      const allMessages = snapShot.docs.map(snap => {
        return {...snap.data(), createdAt: new Date()};
      });
      setMessages(allMessages);
    });
  }, []);

  const onSend = messageArray => {
    console.log(messageArray);
    const msg = messageArray[0];
    const myMsg = {
      ...msg,
      senderId: 4,
      recieverId: 5,
    };
    setMessages(prevMessages => GiftedChat.append(prevMessages, myMsg));

    firestore()
      .collection('Chats')
      .doc('12345')
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
