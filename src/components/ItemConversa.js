import React from "react";
import { StyleSheet, View, Text } from "react-native";

class ItemConversa extends React.PureComponent {
  renderConversa() {
    if (this.props.conversa.tipo === "e")
      return (
        <View
          style={{ alignItems: "flex-end", marginVertical: 5, marginLeft: 40 }}
        >
          <Text style={styles.textoMensagemUsuario}>
            {this.props.conversa.mensagem}
          </Text>
        </View>
      );
    else
      return (
        <View
          style={{
            alignItems: "flex-start",
            marginVertical: 5,
            marginRight: 40
          }}
        >
          <Text style={styles.textoMensagemContato}>
            {this.props.conversa.mensagem}
          </Text>
        </View>
      );
  }
  render() {
    return this.renderConversa();
  }
}

export default ItemConversa;

const styles = StyleSheet.create({
  textoMensagemUsuario: {
    fontSize: 18,
    color: "#000",
    padding: 10,
    backgroundColor: "#dbf5b4",
    elevation: 1,
    borderRadius: 5
  },
  textoMensagemContato: {
    fontSize: 18,
    color: "#000",
    padding: 10,
    backgroundColor: "#f7f7f7",
    elevation: 1,
    borderRadius: 5
  }
});
