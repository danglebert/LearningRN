import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = ({ placeName, placeNameChangedHandler }) => (
  <DefaultInput
    placeholder="Place Name"
    value={placeName}
    onChangeText={placeNameChangedHandler}
    style={styles.input}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '80%'
  }
});

export default PlaceInput;
