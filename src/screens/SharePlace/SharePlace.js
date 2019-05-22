import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
  // this naming convention for navigatorStyle is important
  // You can see more of this in react native navigation docs
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    }
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
    this.setState({
      controls: {
        ...this.state.controls,
        placeName: {
          ...this.state.controls.placeName,
          value: placeName,
          valid: validate(
            placeName,
            this.state.controls.placeName.validationRules
          ),
          touched: true
        }
      }
    });
  };

  placeAddedHandler = () => {
    if (this.state.controls.placeName.value.trim() !== '') {
      this.props.onAddPlace(
        this.state.controls.placeName.value,
        this.state.controls.location.value,
        this.state.controls.image.value
      );
      this.setState({
        controls: {
          ...this.state.controls,
          placeName: {
            ...this.state.controls.placeName,
            value: '',
            touched: false
          }
        }
      });
    }
  };

  locationPickedHandler = location => {
    this.setState({
      controls: {
        ...this.state.controls,
        location: {
          value: location,
          valid: true
        }
      }
    });
  };

  imagePickedHander = img => {
    this.setState({
      controls: {
        ...this.state.controls,
        image: {
          value: img,
          valid: true
        }
      }
    });
  };

  render() {
    const { placeName, location, image } = this.state.controls;
    let submitButton = (
      <Button
        title="Share the Place!"
        onPress={this.placeAddedHandler}
        disabled={!placeName.valid || !location.valid || !image.valid}
      />
    );

    if (this.props.isLoading) submitButton = <ActivityIndicator />;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* instead of using contentContainerStyle above for the scroll view, could have also just used a traditional style with a View around everything besides the ScrollView*/}
        <MainText>
          <HeadingText>Share a place with us!</HeadingText>
        </MainText>
        <PickImage onImagePicked={this.imagePickedHander} />
        <PickLocation onLocationPick={this.locationPickedHandler} />
        <PlaceInput
          placeData={placeName}
          placeNameChangedHandler={this.placeNameChangedHandler}
        />
        <View style={styles.button}>{submitButton}</View>
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

const mapState = state => ({
  isLoading: state.ui.isLoading
});

const mapDispatch = dispatch => ({
  onAddPlace: (placeName, location, image) =>
    dispatch(addPlace(placeName, location, image))
});

export default connect(
  mapState,
  mapDispatch
)(SharePlaceScreen);
