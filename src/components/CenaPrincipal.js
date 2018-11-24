import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Conversas from "./Conversas";
import Contatos from "./Contatos";

import TabBarMenu from "./TabBarMenu";

export default class CenaPrincipal extends React.Component {
  state = {
    index: 0,
    routes: [{ key: "1", title: "Conversas" }, { key: "2", title: "Contatos" }]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => <TabBarMenu {...props} />;

  _renderScene = SceneMap({
    "1": Conversas,
    "2": Contatos
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      />
    );
  }
}
