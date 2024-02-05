import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import MapView, {
  Marker,
  Callout,
  Circle,
  Polyline,
  Polygon,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from './config/constants';
import * as geolib from 'geolib';

let myPolygon = [
  {
    latitude: 33.56637789396995,
    longitude: 73.12917163558515,
  },

  {
    latitude: 33.55318077999257,
    longitude: 73.12516617261652,
  },

  {
    latitude: 33.5393139356739,
    longitude: 73.18617247312305,
  },

  {
    latitude: 33.565196911151396,
    longitude: 73.16947276905294,
  },
];

const MapScreen = () => {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [marker, setMarker] = useState();
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

  async function moveToLocation(latitude, longitude) {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    });
  }

  function locationLiesInsidePolygon(coordinates) {
    let bol = geolib.isPointInPolygon(coordinates, myPolygon);
    console.log('_locationLiesInsidePolygon', bol);
    let msg = '';
    if (bol) {
      msg = 'coordinates exist inside polygon';
    } else {
      msg = 'coordinates exist outside polygon';
    }
    Alert.alert('Gep fancing', msg, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Presed')},
    ]);
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          zIndex: 1,
          flex: 0.5,
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <View style={{flex: 0.5}}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Origin"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(JSON.stringify(details?.geometry?.location));
              let originCoordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              };
              setOrigin(originCoordinates);
              moveToLocation(
                // details?.geometry?.location.lat,
                // details?.geometry?.location.lng,
                originCoordinates,
              );

              console.log(data, details);
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            onFail={error => console.log(error)}
          />
        </View>
        <View style={{flex: 0.5, marginLeft: 5}}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Destination"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(JSON.stringify(details?.geometry?.location));
              let destinationCoordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              };
              setDestination(destinationCoordinates);
              moveToLocation(
                // details?.geometry?.location.lat,
                // details?.geometry?.location.lng,
                destinationCoordinates,
              );

              console.log(data, details);
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            onFail={error => console.log(error)}
          />
        </View>
      </View>
      <MapView
        ref={mapRef}
        onPress={e => {
          console.log(e.nativeEvent.coordinate);
          setMarker(e.nativeEvent.coordinate);
          locationLiesInsidePolygon(e.nativeEvent.coordinate);
        }}
        style={{flex: 1, zIndex: 0}}
        initialRegion={{
          latitude: 33.62571806303041,
          longitude: 73.11862946994432,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {marker !== undefined ? <Marker coordinate={marker}></Marker> : null}
        {origin !== undefined ? <Marker coordinate={origin}></Marker> : null}
        {destination !== undefined ? (
          <Marker coordinate={destination}></Marker>
        ) : null}

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
        {/* <Marker
          coordinate={{
            latitude: 33.6088101224969,
            longitude: 73.16781057676766,
          }}>
          <MyCustomMarkerView />
          <Callout style={{width: 300, height: 300, backgroundColor: 'white'}}>
            <MyCustomCalloutView />
          </Callout>
        </Marker> */}
        {/* Multiple Marker */}
        {markersList.map(marker => (
          <Marker
            draggable
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
            onDragEnd={e => console.log({x: e.nativeEvent.coordinate})}>
            {/* <View style={styles.customMarker}>
              <Image source={marker.image} style={styles.markerImage} />
            </View> */}
          </Marker>
        ))}
        <Circle
          center={{
            latitude: 33.5968236510236,
            longitude: 73.1405082391813,
          }}
          radius={200}
          fillColor="#EBF5FB"
          strokeColor="blue"
        />

        <Polyline
          strokeWidth={2}
          strokeColor="red"
          coordinates={[
            {
              latitude: 33.603920586624945,
              longitude: 73.13552980317692,
            },
            {
              latitude: 33.60524308510608,
              longitude: 73.11840658082056,
            },
          ]}
        />

        <Polygon
          strokeWidth={2}
          strokeColor="red"
          fillColor="#EBF5FB"
          coordinates={myPolygon}
        />
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            strokeColor="blue"
            strokeWidth={2}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
          />
        ) : null}
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
