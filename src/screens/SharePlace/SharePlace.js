import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
  // this naming convention for navigatorStyle is important
  // You can see more of this in react native navigation docs
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    placeName: ''
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = evt => {
    if (evt.type === 'NavBarButtonPress') {
      if (evt.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer();
      }
    }
  };

  placeNameChangedHandler = placeName => {
    this.setState({ placeName });
  };

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== '') {
      this.props.onAddPlace(this.state.placeName);
      this.setState({ placeName: '' });
    }
  };

  render() {
    const { placeName } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* instead of using contentContainerStyle above for the scroll view, could have also just used a traditional style with a View around everything besides the ScrollView*/}
        <MainText>
          <HeadingText>Share a place with us!</HeadingText>
        </MainText>
        <PickImage />
        <PickLocation />
        <PlaceInput
          placeName={placeName}
          placeNameChangedHandler={this.placeNameChangedHandler}
        />
        <View style={styles.button}>
          <Button title="Share the Place!" onPress={this.placeAddedHandler} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

const mapDispatch = dispatch => ({
  onAddPlace: placeName => dispatch(addPlace(placeName))
});

export default connect(
  null,
  mapDispatch
)(SharePlaceScreen);
