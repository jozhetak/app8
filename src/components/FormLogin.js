import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  modificaEmail,
  modificaSenha,
  autenticarUsuario
} from "../actions/AutenticacaoActions";

const background_img = require("../../imgs/background.png");

class FormLogin extends React.Component {
  _autenticaUsuario() {
    const { email, senha } = this.props;

    this.props.autenticarUsuario({ email, senha });
  }

  renderBtnAcessar() {
    if (this.props.loadingLogin) {
      return <ActivityIndicator size='large'/>;
    }
    return <Button title="Acessar" onPress={() => this._autenticaUsuario()} />;
  }

  render() {
    return (
      <ImageBackground source={background_img} style={styles.background_img}>
        <View style={styles.principal}>
          <View style={styles.topo}>
            <Text style={styles.txtTitulo}>Whatsapp Clone</Text>
          </View>

          <View style={styles.meio}>
            <TextInput
              value={this.props.email}
              placeholder="Email"
              placeholderTextColor="#fff"
              style={styles.formInput}
              onChangeText={texto => this.props.modificaEmail(texto)}
            />
            <TextInput
              value={this.props.senha}
              placeholder="Senha"
              placeholderTextColor="#fff"
              style={styles.formInput}
              onChangeText={texto => this.props.modificaSenha(texto)}
              secureTextEntry
            />
            <Text style={styles.erroLogin}>{this.props.erroLogin}</Text>

            <TouchableOpacity onPress={() => Actions.cadastro()}>
              <Text style={styles.txtCadastro}>
                Ainda não tem cadastro? cadastre-se
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rodape}>{this.renderBtnAcessar()}</View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroLogin: state.AutenticacaoReducer.erroLogin,
  loadingLogin: state.AutenticacaoReducer.loadingLogin
});

export default connect(
  mapStateToProps,
  { modificaEmail, modificaSenha, autenticarUsuario }
)(FormLogin);

const styles = StyleSheet.create({
  background_img: {
    flex: 1
  },
  principal: {
    flex: 1,
    padding: 10
  },
  topo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  meio: {
    flex: 2,
    alignItems: "center"
  },
  rodape: {
    flex: 2
  },

  txtTitulo: {
    fontSize: 25,
    backgroundColor: "transparent",
    color: "#fff"
  },
  formInput: {
    fontSize: 20,
    height: 45,
    alignSelf: "stretch",
    color: "#fff"
  },
  txtCadastro: {
    fontSize: 20,
    color: "#fff"
  },
  erroLogin: {
    color: "#ff0000",
    fontSize: 18
  }
});
