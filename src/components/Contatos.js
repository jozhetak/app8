import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight
} from "react-native";
import { contatosUsuarioFetch } from "../actions/AppActions";
import { connect } from "react-redux";
import ItemListaContatos from "./ItemListaContatos";

class Contatos extends React.Component {
  componentWillMount() {
    this.props.contatosUsuarioFetch();
    this.criarFonteDeDados(this.props.listaContatos);
  }

  componentWillReceiveProps(nextProps) {
    this.criarFonteDeDados(nextProps.listaContatos);
  }

  criarFonteDeDados(contatos) {
    this.fonteDeDados = contatos;
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <FlatList
          data={this.fonteDeDados}
          renderItem={({ item, index }) => <ItemListaContatos contato={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listaContatos: state.ListaContatosReducer.listaContatos
});

export default connect(
  mapStateToProps,
  { contatosUsuarioFetch }
)(Contatos);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1
  }
});
