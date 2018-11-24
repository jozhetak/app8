import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TabBar } from "react-native-tab-view";
import { Constants } from "expo";
import { Actions } from "react-native-router-flux";
import { habilitaInclusaoContao, deslogar } from "../actions/AppActions";
import { connect } from "react-redux";

const adicionarContatoImg = require("../../imgs/adicionar-contato.png");

const TabBarMenu = props => (
  <View style={styles.principal}>
    <View style={styles.header} />

    <View style={styles.viewTitulo}>
      <Text style={styles.txtTitulo}>WhatsApp Clone</Text>

      <TouchableOpacity
        onPress={() => {
          Actions.adicionarcontato();
          props.habilitaInclusaoContao();
        }}
      >
        <Image source={adicionarContatoImg} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.deslogar()}>
        <Text style={styles.txtSair}>Sair</Text>
      </TouchableOpacity>
    </View>

    <TabBar {...props} style={styles.tabBar} />
  </View>
);

export default connect(
  null,
  { habilitaInclusaoContao, deslogar }
)(TabBarMenu);

const styles = StyleSheet.create({
  principal: {
    marginBottom: 6,
    elevation: 6
  },
  header: {
    height: Constants.statusBarHeight,
    backgroundColor: "#114D44"
  },
  viewTitulo: {
    height: 50,
    backgroundColor: "#115E54",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  txtTitulo: {
    color: "#fff",
    fontSize: 20
  },
  tabBar: {
    backgroundColor: "#115E54",
    elevation: 0
  },
  txtSair: {
    color: "#fff",
    fontSize: 20
  }
});
