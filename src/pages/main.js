import React, { Component } from "react";

import { View, Text } from "react-native";

export default class Main extends Component {
  static navigationOptions = {
    title: "App da Alegria",
    headerStyle: {
      backgroundColor: "#DA552F"
    },
    headerTintColor: "#FFF"
  };

  render () {
    return (
      <View>
        <Text> Página Main </Text>
      </View>
    );
  }
}