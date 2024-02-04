// import React, {useState} from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Animated, {
//   Easing,
//   ReduceMotion,
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withSequence,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';

// const VoicenoteAnimation = () => {
//   const [hideButtton, setHideButton] = useState(false);
//   const [style, setStyle] = useState('Semi Circle');
//   const appletranslateY = useSharedValue(0);
//   const appletranslateX = useSharedValue(0);
//   const fbtranslateY = useSharedValue(0);
//   const googletranslateY = useSharedValue(0);
//   const googletranslateX = useSharedValue(0);
//   const twittertranslateY = useSharedValue(0);
//   const twittertranslateX = useSharedValue(0);
//   const linkedIntranslateY = useSharedValue(0);
//   const linkedIntranslateX = useSharedValue(0);

//   const appleStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {translateX: appletranslateX.value},
//         {translateY: appletranslateY.value},
//       ],
//     };
//   });
//   const fbStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{translateY: fbtranslateY.value}],
//     };
//   });
//   const googleStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {translateX: googletranslateX.value},
//         {translateY: googletranslateY.value},
//       ],
//     };
//   });
//   const linkedInStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {translateX: linkedIntranslateX.value},
//         {translateY: linkedIntranslateY.value},
//       ],
//     };
//   });
//   const twitterStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {translateX: twittertranslateX.value},
//         {translateY: twittertranslateY.value},
//       ],
//     };
//   });

//   const handlePress = () => {
//     setHideButton(!hideButtton);
//     fbtranslateY.value = withTiming(
//       fbtranslateY.value === 0 ? (style === 'Tree' ? -130 : -100) : 0,
//     );
//     googletranslateY.value = withTiming(
//       googletranslateY.value === 0 ? (style === 'Tree' ? -100 : -70) : 0,
//     );
//     googletranslateX.value = withTiming(
//       googletranslateX.value === 0 ? (style === 'Tree' ? -100 : -80) : 0,
//     );
//     appletranslateX.value = withTiming(
//       appletranslateX.value === 0 ? (style === 'Tree' ? 100 : 80) : 0,
//     );
//     appletranslateY.value = withTiming(
//       appletranslateY.value === 0 ? (style === 'Tree' ? -100 : -70) : 0,
//     );
//     twittertranslateY.value = withTiming(
//       linkedIntranslateX.value === 0 ? (style === 'Tree' ? -50 : 0) : 0,
//     );
//     twittertranslateX.value = withTiming(
//       twittertranslateX.value === 0 ? (style === 'Tree' ? -40 : -100) : 0,
//     );
//     linkedIntranslateY.value = withTiming(
//       linkedIntranslateX.value === 0 ? (style === 'Tree' ? -50 : 0) : 0,
//     );
//     linkedIntranslateX.value = withTiming(
//       linkedIntranslateX.value === 0 ? (style === 'Tree' ? 50 : 100) : 0,
//     );
//   };
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       {!hideButtton ? (
//         <TouchableOpacity
//           style={styles.socialButton}
//           onPress={() => {
//             handlePress();
//           }}>
//           <Text style={{fontWeight: 'bold'}}>Social</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             handlePress();
//           }}>
//           <Image
//             style={{width: 20, height: 20, resizeMode: 'contain'}}
//             source={require('./assets/close.png')}
//           />
//         </TouchableOpacity>
//       )}
//       <Animated.View style={[styles.button, fbStyles]}>
//         <Image
//           style={{width: 20, height: 20, resizeMode: 'contain'}}
//           source={require('./assets/fb.png')}
//         />
//       </Animated.View>
//       <Animated.View style={[styles.button, appleStyles]}>
//         <Image
//           style={{width: 20, height: 20, resizeMode: 'contain'}}
//           source={require('./assets/apple.png')}
//         />
//       </Animated.View>
//       <Animated.View style={[styles.button, googleStyles]}>
//         <Image
//           style={{width: 20, height: 20, resizeMode: 'contain'}}
//           source={require('./assets/google.png')}
//         />
//       </Animated.View>

//       <Animated.View style={[styles.button, linkedInStyles]}>
//         <Image
//           style={{width: 20, height: 20, resizeMode: 'contain'}}
//           source={require('./assets/linkedIn.png')}
//         />
//       </Animated.View>
//       <Animated.View style={[styles.button, twitterStyles]}>
//         <Image
//           style={{width: 20, height: 20, resizeMode: 'contain'}}
//           source={require('./assets/twittter.png')}
//         />
//       </Animated.View>

//       <View
//         style={{
//           flexDirection: 'row',
//           width: '70%',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           position: 'absolute',
//           bottom: 50,
//         }}>
//         <TouchableOpacity
//           style={{
//             ...styles.socialButton,
//             backgroundColor: style === 'Semi Circle' ? '#DEF4DC' : 'white',
//           }}
//           onPress={() => {
//             setStyle('Semi Circle');
//             hideButtton && handlePress();
//           }}>
//           <Text style={{fontWeight: 'bold', fontSize: 12}}>Semi Circle</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             ...styles.socialButton,
//             backgroundColor: style === 'Tree' ? '#DEF4DC' : 'white',
//           }}
//           onPress={() => {
//             setStyle('Tree');
//             hideButtton && handlePress();
//           }}>
//           <Text style={{fontWeight: 'bold', fontSize: 12}}>Tree</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   socialButton: {
//     height: 45,
//     width: 100,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//     elevation: 2,
//     backgroundColor: 'white',
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1,
//   },

//   button: {
//     width: 40,
//     height: 40,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//     elevation: 2,
//     backgroundColor: 'white',
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//   },
// });
// export default VoicenoteAnimation;

// {
//   /* <TouchableOpacity
//         style={{
//           backgroundColor: '#E7A6A6',
//           height: 50,
//           width: 120,
//           position: 'absolute',
//           bottom: 20,
//           borderRadius: 10,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//         onPress={() => {
//           handlePress();
//         }}>
//         <Text style={{color: 'white', fontWeight: 'bold'}}>Animate</Text>
//       </TouchableOpacity> */
// }
