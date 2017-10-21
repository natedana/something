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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Login'
  };

  postSignin() {
  console.log('signing in');
  return fetch(`${domain}/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
        this.props.navigation.navigate('Users');
      } else {
        alert('Invalid credentials bruh');
      }
    })
    .catch((err) => {
      console.log('it errored')
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <Text>{this.state.message}</Text>
          <TextInput
            style={styles.input}
            placeholder = "Username"
            onChangeText={(text) => this.setState({username: text})} />
          <TextInput
            style={styles.input}
            placeholder = "Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})} />
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.postSignin()} }>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export default LoginScreen;
