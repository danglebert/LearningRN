import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

const ButtonWithBackground = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled && styles.disabled
      ]}
    >
      <Text style={props.disabled && styles.disabledText}>
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) return content;

  return (
    <TouchableHighlight onPress={props.onPress}>{content}</TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa'
  },
  disabledText: {
    color: '#aaa'
  }
});

export default ButtonWithBackground;
