import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps'; // Can name this whatever, it is the default export of r-n-m

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122
    },
    locationChosen: false
  };

  pickLocationHandler = evt => {
    const coords = evt.nativeEvent.coordinate;
    this.setState({
      focusedLocation: {
        ...this.state.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationChosen: true
    });
  };

  render() {
    const { focusedLocation, locationChosen } = this.state;
    let marker = null;

    if (locationChosen) {
      marker = <MapView.Marker coordinate={focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={focusedLocation}
          region={focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert('Pick Location!')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '80%',
    height: 250,
    borderColor: 'black',
    borderWidth: 0.5
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
