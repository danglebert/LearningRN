import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = ({ placeData, placeNameChangedHandler }) => (
  <DefaultInput
    placeholder="Place Name"
    value={placeData.value}
    valid={placeData.valid}
    touched={placeData.touched}
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
