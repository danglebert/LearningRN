import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Icon size={30} name="ios-person" style={styles.margin} />
          <HeadingText style={[styles.margin, { fontSize: 18 }]}>
            User Settings
          </HeadingText>
        </View>
        <TouchableOpacity>
          <View style={styles.listItem}>
            <Icon size={30} name="ios-log-out" style={styles.margin} />
            <Text style={styles.margin}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 10,
    backgroundColor: 'white',
    flex: 1
  },
  heading: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bbb',
    borderColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  margin: {
    margin: 10
  }
});

export default SideDrawer;
