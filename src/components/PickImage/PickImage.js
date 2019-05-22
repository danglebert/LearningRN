import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import defaultImg from '../../assets/paradise-background.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  state = {
    pickedImage: defaultImg
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image' }, res => {
      if (res.didCancel) {
        console.log('User cancelled!');
      } else if (res.error) {
        console.log('error: ', res.error);
      } else {
        this.setState({
          pickedImage: {
            uri: res.uri
          }
        });
        this.props.onImagePicked({ uri: res.uri, base64: res.data });
      }
    });
  };

  render() {
    const { pickedImage } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
    alignItems: 'center'
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

export default PickImage;
