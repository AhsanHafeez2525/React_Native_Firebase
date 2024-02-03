import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const MapScreen = () => {
  return (
    <View>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 33.62571806303041,
          longitude: 73.11862946994432,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker
          coordinate={{
            latitude: 33.62571806303041,
            longitude: 73.11862946994432,
          }}
          title={'I am here'}
          description={'this is my home destination'}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
