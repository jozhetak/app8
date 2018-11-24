import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Button,
  ImageBackground
} from "react-native";
import {Actions} from 'react-native-router-flux'

const background_img = require("../../imgs/background.png");
const logo = require("../../imgs/logo.png");

export default props => (
  <ImageBackground source={background_img} style={styles.background_img}>
    <View style={styles.principal}>
      <View style={styles.top}>
        <Text style={styles.textoBemVindo}>Seja Bem-Vindo</Text>
        <Image source={logo} />
      </View>

      <View style={styles.bottom}>
        <Button title="Fazer Login" onPress={() => Actions.login()} />
      </View>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background_img: {
    flex: 1
  },
  principal: {
    flex: 1,
    padding: 15
  },

  top: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  bottom: {
    flex: 1
  },
  textoBemVindo: {
    fontSize: 20,
    color: "#fff"
  }
});
