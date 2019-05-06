import React from 'react';
import ListItem from '../ListItem/ListItem';
import { ScrollView, StyleSheet, FlatList } from 'react-native';

const PlaceList = ({ places, onItemSelected }) => {
  return (
    // Scroll view not as efficient - renders all elements at once even if not scrolled down to.
    // <ScrollView style={styles.listContainer}>
    //   {places.map((place, i) => (
    //     <ListItem place={place} idx={i} key={i} onItemSelected={onItemSelected} />
    //   ))}
    // </ScrollView>

    // Flatlist requires that the "data" prop passed into it are objects, with at least one field being called "key". It uses the key for rendering. If the key is not a string, you will also get an error msg.

    <FlatList
      style={styles.listContainer}
      data={places}
      renderItem={data => (
        <ListItem
          place={data.item.name}
          image={data.item.image}
          itemKey={data.item.key}
          onItemSelected={onItemSelected}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default PlaceList;
