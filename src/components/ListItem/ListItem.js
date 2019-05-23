import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = ({ placeName, image, onItemSelected, itemKey }) => (
  <TouchableOpacity onPress={() => onItemSelected(itemKey)}>
    <View style={styles.listItem}>
      <Image source={image} style={styles.placeImage} />
      <Text>{placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    margin: 5,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeImage: {
    marginRight: 8,
    width: 30,
    height: 30
  }
});

export default ListItem;
