import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = props => (
  <TextInput
    {...props}
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched && styles.invalid
    ]}
  />
  // Whichever style gets handed in last takes precedent
  // i.e. here whatever component that calls DefaultInput and hands it a style prop would take precedent
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#eee',
    borderColor: '#bbb',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    padding: 5,
    borderRadius: 50
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red'
  }
});

export default DefaultInput;
