import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps'; // Can name this whatever, it is the default export of r-n-m

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0001
    },
    locationChosen: false
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.pickLocationHandler({
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        });
      },
      err => {
        console.log(err);
        alert('Fetching position failed, please pick one manually.');
      }
    );
  };

  pickLocationHandler = evt => {
    const coords = evt.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState({
      focusedLocation: {
        ...this.state.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationChosen: true
    });
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
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
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => {
            this.map = ref;
          }} // more details on ref here https://reactjs.org/docs/refs-and-the-dom.html - made a reference to this mapview component that is called "map"
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
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
