import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ImagePicker, Location, Permissions, MapView } from 'expo';
const domain = "https://something-horizons.herokuapp.com";
import styles from '../styles/styles';

class SaveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  };
  static navigationOptions = {
    title: 'Save' //you put the title you want to be displayed here
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log('IMAGE PICKED', result);

    if (!result.cancelled) {
      console.log('did it get here')
      console.log('result inside here', result)
      console.log('THIS.STATE.IMAGE', this.state.image)
      this.setState({image: result.uri})
      console.log('THIS.STATE.IMAGE2', this.state.image)
    }
  };
  // componentDidMount() {
  //   this.props.navigation.setParams({
  //     onRightPress: yourHandlerFunctionGoesHere
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
          <Button
              title="See a poster or flyer? Save your event!"
              onPress={ () => {this._pickImage()} }
          />
          { console.log('CONSOLE IN RENDER', this.state.image) }
          {this.state.image &&
            <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
      </View>
    )
  }
}

export default SaveScreen;
