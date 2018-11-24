import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Text,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import {
  modificaEmail,
  modificaSenha,
  modificaNome,
  cadastraUsuario
} from "../actions/AutenticacaoActions";

const background_img = require("../../imgs/background.png");

class FormCadastro extends React.Component {
  _cadastraUsuario() {
    const { nome, email, senha } = this.props;

    this.props.cadastraUsuario(nome, email, senha);
  }

  renderBtnCadastrar() {
    if (this.props.loadingCadastro) {
      return <ActivityIndicator size="large" />;
    }
    return <Button title="Cadastrar" onPress={() => this._cadastraUsuario()} />;
  }

  render() {
    return (
      <ImageBackground source={background_img} style={styles.background_img}>
        <View style={styles.principal}>
          <View style={styles.divCadastro}>
            <TextInput
              value={this.props.nome}
              placeholder="Nome"
              placeholderTextColor="#fff"
              style={styles.formInput}
              onChangeText={texto => this.props.modificaNome(texto)}
            />
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

            <Text style={styles.textoErro}>{this.props.erroCadastro}</Text>
          </View>

          <View style={styles.divBotao}>{this.renderBtnCadastrar()}</View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  nome: state.AutenticacaoReducer.nome,
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroCadastro: state.AutenticacaoReducer.erroCadastro,
  loadingCadastro: state.AutenticacaoReducer.loadingCadastro
});

export default connect(
  mapStateToProps,
  { modificaEmail, modificaSenha, modificaNome, cadastraUsuario }
)(FormCadastro);

const styles = StyleSheet.create({
  background_img: {
    flex: 1
  },
  principal: {
    flex: 1,
    padding: 10
  },
  divCadastro: {
    alignItems: "stretch",
    flex: 3,
    justifyContent: "center"
  },
  divBotao: {
    alignItems: "stretch",
    flex: 2
  },
  formInput: {
    fontSize: 20,
    height: 45,
    color: "#fff"
  },
  textoErro: {
    alignSelf: "center",
    color: "#ff0000",
    fontSize: 18
  }
});
