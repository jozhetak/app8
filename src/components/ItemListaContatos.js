import React from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

class ItemListaContatos extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight
        onPress={() =>
          Actions.conversa({
            nomeContato: this.props.contato.nome,
            emailContato: this.props.contato.email,
            title: this.props.contato.nome
          })
        }
        activeOpacity={0.8}
        underlayColor="#CCC"
      >
        <View style={styles.viewItem}>
          <Text style={{ fontSize: 25 }}>{this.props.contato.nome}</Text>
          <Text style={{ fontSize: 18 }}>{this.props.contato.email}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ItemListaContatos;

const styles = StyleSheet.create({
  viewItem: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#CCC"
  }
});
