import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import {
  modificaMensagem,
  enviaMensagem,
  conversaUsuarioFetch,
  limpaConversa
} from "../actions/AppActions";
import ItemConversa from "./ItemConversa";
import _ from "lodash";

const imagemEnviarMensagem = require("../../imgs/enviar_mensagem.png");

class Conversa extends React.Component {
  componentWillMount() {
    this.props.conversaUsuarioFetch(this.props.emailContato);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emailContato != nextProps.emailContato) {
      this.props.conversaUsuarioFetch(nextProps.emailContato);
    }
  }
  componentWillUnmount() {
    this.props.limpaConversa();
  }
  _enviaMensagem() {
    const { mensagem, nomeContato, emailContato } = this.props;

    this.props.enviaMensagem(mensagem, nomeContato, emailContato);
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ android: 74, ios: 84 })}
        style={{ flex: 1 }}
        behavior="padding"
      >
        <View style={styles.viewPrincipal}>
          <View style={styles.viewListaMensagens}>
            <FlatList
              data={this.props.conversa}
              renderItem={({ item, index }) => <ItemConversa conversa={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.viewInferior}>
            <TextInput
              style={styles.textInput}
              value={this.props.mensagem}
              onChangeText={texto => this.props.modificaMensagem(texto)}
            />
            <TouchableHighlight
              onPress={() => this._enviaMensagem()}
              underlayColor="#fff"
            >
              <Image source={imagemEnviarMensagem} />
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversa: state.ListaConversaReducer.conversa,
    mensagem: state.AppReducer.mensagem
  };
};

export default connect(
  mapStateToProps,
  { modificaMensagem, enviaMensagem, conversaUsuarioFetch, limpaConversa }
)(Conversa);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: "#eee4dc",
    padding: 10
  },
  viewListaMensagens: {
    flex: 1,
    paddingBottom: 20
  },
  viewInferior: {
    height: 60,
    flexDirection: "row"
  },
  textInput: {
    flex: 4,
    backgroundColor: "#fff",
    fontSize: 18,
    borderRadius: 10,
    marginRight: 5
  }
});
