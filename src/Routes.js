import React from "react";
import {} from "react-native";
import { Router, Scene } from "react-native-router-flux";
import FormLogin from "./components/FormLogin";
import FormCadastro from "./components/FormCadastro";
import BoasVindas from "./components/BoasVindas";
import CenaPrincipal from "./components/CenaPrincipal";
import AdicionarContato from "./components/AdicionarContato";
import Conversa from "./components/Conversa";

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Scene
          key="root"
          navigationBarStyle={{ backgroundColor: "#115E54" }}
          titleStyle={{ color: "#fff", textAlign: "center", flex: 1 }}
          hideNavBar
        >
          <Scene key="login" component={FormLogin} title="Login" initial />
          <Scene
            key="cadastro"
            component={FormCadastro}
            title="Cadastro"
            hideNavBar={false}
          />
          <Scene key="boasvindas" component={BoasVindas} title="Bem-Vindo" />
          <Scene key="principal" component={CenaPrincipal} title="Principal" />
          <Scene
            key="adicionarcontato"
            component={AdicionarContato}
            title="Adicionar Contato"
            hideNavBar={false}
          />
          <Scene
            key="conversa"
            component={Conversa}
            title={"Conversa"}
            hideNavBar={false}
          />
        </Scene>
      </Router>
    );
  }
}
