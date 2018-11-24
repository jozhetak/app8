import React from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

class ItemListaConversas extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight
        underlayColor="#CCC"
        activeOpacity={0.8}
        onPress={() =>
          Actions.conversa({
            nomeContato: this.props.contatoConversa.nome,
            emailContato: this.props.contatoConversa.email,
            title: this.props.contatoConversa.nome
          })
        }
      >
        <View style={styles.viewItem}>
          <Text style={{ fontSize: 25 }}>
            {this.props.contatoConversa.nome}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ItemListaConversas

const styles = StyleSheet.create({
  viewItem: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#CCC"
  }
});
