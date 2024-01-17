import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = () => {
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

export default ChatScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
