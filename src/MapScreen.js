// import React, {useState} from 'react';
// import {StyleSheet, Text, View, Image} from 'react-native';
// import MapView, {Marker, Callout} from 'react-native-maps';
// const MapScreen = () => {
//   const [markersList, setMarkersList] = useState([
//     {
//       id: 1,
//       latitude: 33.62571806303041,
//       longitude: 73.11862946994432,
//       title: 'Team A',
//       description: 'This is Team A cuurent location',
//       pinColor: 'red',
//       //   image: require('../Images/reet1.jpeg'),
//     },
//     {
//       id: 2,
//       latitude: 33.62679306226889,
//       longitude: 73.12012067467623,
//       title: 'I am here',
//       description: 'This is Team B cuurent location',
//       pinColor: 'blue',
//     },
//     {
//       id: 3,
//       latitude: 33.63342207462496,
//       longitude: 73.11299497487948,
//       title: 'I am here',
//       description: 'This is Team B cuurent location',
//       pinColor: 'orange',
//     },
//     {
//       id: 4,
//       latitude: 33.63094093819104,
//       longitude: 73.10993737218674,
//       title: 'I am here',
//       description: 'This is Team B cuurent location',
//       pinColor: '#44C614',
//     },
//   ]);

//   const MyCustomMarkerView = () => {
//     return (
//       <Image
//         style={{width: 30, height: 30}}
//         source={require('../Images/carmarker.png')}
//       />
//     );
//   };

//   const MyCustomCalloutView = () => {
//     return (
//       <View>
//         <Text>the car is ready now</Text>
//       </View>
//     );
//   };

//   return (
//     <View>
//       <MapView
//         style={{width: '100%', height: '100%'}}
//         initialRegion={{
//           latitude: 33.62571806303041,
//           longitude: 73.11862946994432,
//           latitudeDelta: 0.1,
//           longitudeDelta: 0.1,
//         }}>
//         {/* Single Marker */}
//         {/* <Marker
//           coordinate={{
//             latitude: 33.62571806303041,
//             longitude: 73.11862946994432,
//           }}
//           title={'I am here'}
//           description={'this is my home destination'}
//         /> */}
//         {/* Custom Marker View */}
//         <Marker
//           coordinate={{
//             latitude: 33.6088101224969,
//             longitude: 73.16781057676766,
//           }}>
//           <MyCustomMarkerView />
//           <Callout style={{width: 300, height: 300, backgroundColor: 'white'}}>
//             <MyCustomCalloutView />
//           </Callout>
//         </Marker>
//         ;{/* Multiple Marker */}
//         {markersList.map(marker => {
//           return (
//             <Marker
//               key={marker.id}
//               coordinate={{
//                 latitude: marker.latitude,
//                 longitude: marker.longitude,
//               }}
//               title={marker.title}
//               description={marker.description}
//               pinColor={marker.pinColor}>
//               {/* <View style={styles.customMarker}>
//                 <Image source={marker.image} style={styles.markerImage} />
//               </View> */}
//             </Marker>
//           );
//         })}
//       </MapView>
//     </View>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   customMarker: {
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   markerImage: {
//     width: 40,
//     height: 40,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
// });

import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';

const MapScreen = () => {
  const [markersList, setMarkersList] = useState([
    {
      id: 1,
      latitude: 33.62571806303041,
      longitude: 73.11862946994432,
      title: 'Team A',
      description: 'This is Team A cuurent location',
      pinColor: 'red',
      //   image: require('../Images/reet1.jpeg'),
    },
    // ... (other markers)
  ]);

  const MyCustomMarkerView = () => (
    <Image
      style={{width: 30, height: 30}}
      source={require('../Images/carmarker.png')}
    />
  );

  const MyCustomCalloutView = () => (
    <View>
      <Text>The car is ready now</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 33.62571806303041,
          longitude: 73.11862946994432,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {/* Single Marker */}
        {/* <Marker
          coordinate={{
            latitude: 33.62571806303041,
            longitude: 73.11862946994432,
          }}
          title={'I am here'}
          description={'this is my home destination'}
        /> */}
        {/* Custom Marker View */}
        <Marker
          coordinate={{
            latitude: 33.6088101224969,
            longitude: 73.16781057676766,
          }}>
          <MyCustomMarkerView />
          <Callout style={{width: 300, height: 300, backgroundColor: 'white'}}>
            <MyCustomCalloutView />
          </Callout>
        </Marker>
        {/* Multiple Marker */}
        {markersList.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}>
            {/* <View style={styles.customMarker}>
              <Image source={marker.image} style={styles.markerImage} />
            </View> */}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  customMarker: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default MapScreen;
