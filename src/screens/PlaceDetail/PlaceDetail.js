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
    return (
      <View style={styles[`${view}Container`]}>
        <Image source={place.image} style={styles[`${view}PlaceImage`]} />
        <View>
          <Text style={styles.placeName}>{place.name}</Text>
          <TouchableOpacity onPress={() => this.placeDeletedHandler(place.key)}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertContainer: {
    margin: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  horiContainer: {
    marginTop: 50,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  vertPlaceImage: {
    width: '100%',
    height: 200
  },
  horiPlaceImage: {
    width: '50%',
    height: 200,
    marginRight: 15
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30
  },
  deleteButton: {
    alignItems: 'center'
  }
});

const mapDispatch = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});

export default connect(
  null,
  mapDispatch
)(PlaceDetailScreen);
