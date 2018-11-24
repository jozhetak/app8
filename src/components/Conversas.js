import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { conversasAtivasUsuarioFetch } from "../actions/AppActions";
import ItemListaConversas from "./ItemListaConversas";

class Conversas extends React.Component {
  componentWillMount() {
    this.props.conversasAtivasUsuarioFetch();
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <FlatList
          data={this.props.listaConversasAtivas}
          renderItem={({ item, index }) => (
            <ItemListaConversas contatoConversa={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listaConversasAtivas: state.ListaConversaReducer.listaConversasAtivas
  };
};

export default connect(
  mapStateToProps,
  { conversasAtivasUsuarioFetch }
)(Conversas);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1
  }
});
