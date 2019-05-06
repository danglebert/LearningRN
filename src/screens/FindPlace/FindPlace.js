import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true // this helps performance
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({ placesLoaded: true });
      this.placesLoadedHandler();
    });
  };

  onNavigatorEvent = evt => {
    if (evt.type === 'NavBarButtonPress') {
      if (evt.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer();
      }
    }
  };

  itemSelectedHandler = key => {
    const place = this.props.places.find(p => p.key === key);
    this.props.navigator.push({
      screen: 'LearningRN.PlaceDetailScreen',
      title: place.name,
      passProps: { place }
    });
  };

  render() {
    const { placesLoaded, removeAnim, placesAnim } = this.state;
    let content = (
      <Animated.View
        style={{
          opacity: removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [3, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (placesLoaded) {
      content = (
        <Animated.View style={{ opacity: placesAnim }}>
          <PlaceList
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={!placesLoaded && styles.buttonContainer}>{content}</View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapState = state => ({
  places: state.places.places
});

export default connect(mapState)(FindPlaceScreen);
