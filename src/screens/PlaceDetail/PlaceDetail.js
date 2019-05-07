import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/places';
import MapView from 'react-native-maps';

class PlaceDetailScreen extends Component {
  state = {
    view: Dimensions.get('window').height > 500 ? 'vert' : 'hori'
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = () => {
    this.setState({
      view: Dimensions.get('window').height > 500 ? 'vert' : 'hori'
    });
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.place.key);
    this.props.navigator.pop();
  };

  render() {
    const { place } = this.props;
    const { view } = this.state;
    const fullLocation = {
      ...place.location,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.000001
    };

    return (
      <View style={styles[`${view}Container`]}>
        <View style={styles.heading}>
          <Text style={styles.placeName}>{place.name}</Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => this.placeDeletedHandler(place.key)}
          >
            <Icon size={30} name="ios-trash" color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles[`${view}ImageAndMap`]}>
          <Image source={place.image} style={styles[`${view}PlaceImage`]} />
          <MapView
            style={styles[`${view}Map`]}
            initialRegion={fullLocation}
            region={fullLocation}
          >
            <MapView.Marker coordinate={place.location} />
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertContainer: {
    flex: 1,
    margin: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 5
  },
  horiImageAndMap: {
    flexDirection: 'row'
  },
  vertImageAndMap: {
    flexDirection: 'column'
  },
  horiContainer: {
    width: '100%',
    alignItems: 'center'
  },
  vertPlaceImage: {
    width: '100%',
    height: 200
  },
  horiPlaceImage: {
    width: '45%',
    height: 200,
    marginRight: 15
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    marginRight: 10
  },
  deleteBtn: {
    marginLeft: 10
  },
  horiMap: {
    width: '45%',
    height: 200,
    borderColor: 'black',
    borderWidth: 0.5
  },
  vertMap: {
    width: '100%',
    height: 250,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 5
  }
});

const mapDispatch = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});

export default connect(
  null,
  mapDispatch
)(PlaceDetailScreen);
