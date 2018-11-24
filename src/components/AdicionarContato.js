import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text
} from "react-native";
import { connect } from "react-redux";
import {
  modificaAdicionaContatoEmail,
  adicionaContato
} from "../actions/AppActions";

class AdicionaContato extends React.Component {
  renderAdicionarContato() {
    if (this.props.resultadoAdicaoContato) {
      return (
        <View>
          <Text style={{ fontSize: 20 }}>Contato adicionado com sucesso!</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.viewTextInput}>
            <TextInput
              placeholder="E-mail"
              style={styles.textInput}
              onChangeText={text =>
                this.props.modificaAdicionaContatoEmail(text)
              }
              value={this.props.adiciona_contato_email}
            />
          </View>

          <View style={styles.viewButton}>
            {this.renderBtnAdicionar()}
            <Text style={styles.textErroAdicionarContato}>
              {this.props.erroAdicionarContato}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderBtnAdicionar() {
    if (this.props.adicionarContatoLoading) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <Button
          onPress={() =>
            this.props.adicionaContato(this.props.adiciona_contato_email)
          }
          title="Adicionar"
          color="#115E54"
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>{this.renderAdicionarContato()}</View>
    );
  }
}

const mapStateToProps = state => ({
  adiciona_contato_email: state.AppReducer.adiciona_contato_email,
  erroAdicionarContato: state.AppReducer.erroAdicionarContato,
  adicionarContatoLoading: state.AppReducer.adicionarContatoLoading,
  resultadoAdicaoContato: state.AppReducer.resultadoAdicaoContato
});

export default connect(
  mapStateToProps,
  { modificaAdicionaContatoEmail, adicionaContato }
)(AdicionaContato);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  viewTextInput: {
    flex: 1,
    justifyContent: "center"
  },
  viewButton: {
    flex: 1
  },
  textInput: {
    height: 45,
    fontSize: 20
  },
  textErroAdicionarContato: {
    color: "#ff0000",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15
  }
});
