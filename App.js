/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PanResponder,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { getDirectionAndColor } from './src/helpers/get-direction';


const { width, height } = Dimensions.get("window");

class App extends Component {
  state = {
    zone: "Still Touchable"
  }

  componentWillMount(){
    this.handleActivatePanResponder();
  }

  handleActivatePanResponder = () => {
    console.log('handleActivatePanResponder');
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        console.log('onMoveShouldSetPanResponder');
        return !!getDirectionAndColor(width, height, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log('onPanResponderMove');
        const drag = getDirectionAndColor(width, height, gestureState);
        this.setState({
          zone: drag,
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => {
        console.log('onPanResponderTerminationRequest');
        return true;
      },
    });
  }

  onPress = () => {
    this.setState({
      zone: "I got touched with a parent pan responder"
    });
  }

  render(){
    console.log(this.panResponder);
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.container} {...this.panResponder.panHandlers}>
            <View style={styles.zone1} />
            <TouchableOpacity style={styles.center} onPress={this.onPress}>
              <Text>{this.state.zone}</Text>
            </TouchableOpacity>
            <View style={styles.zone2} />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  zone1: {
    height: 50,
    backgroundColor: "red",
  },
  center: {
    // borderWidth: 5,
    height: height * .8,
    borderColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },
  zone2: {
    height: 50,
    backgroundColor: "blue",
  },
});

export default App;
