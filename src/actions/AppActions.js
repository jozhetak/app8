import {
  MODIFICA_ADICIONA_CONTATO_EMAIL,
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  ADICIONA_CONTATO_LOADING,
  LISTA_CONTATO_USUARIO,
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM,
  LISTA_CONVERSA_USUARIO,
  LIMPA_CONVERSA,
  LISTA_CONVERSAS_ATIVAS_USUARIO
} from "./types";
import firebase from "firebase";
import b64 from "base-64";
import _ from "lodash";
import { Actions } from "react-native-router-flux";

export const modificaAdicionaContatoEmail = email => ({
  type: MODIFICA_ADICIONA_CONTATO_EMAIL,
  payload: email
});

export const adicionaContato = email => {
  return dispatch => {
    email = email.toLowerCase();

    dispatch({ type: ADICIONA_CONTATO_LOADING });

    let emailb64 = b64.encode(email);

    firebase
      .database()
      .ref(`/contatos/${emailb64}`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          let emailUsuarioAutenticado = firebase.auth().currentUser.email;
          let emailUsuarioAutenticadoB64 = b64.encode(emailUsuarioAutenticado);

          const dadosUsuario = _.first(_.values(snapshot.val()));

          firebase
            .database()
            .ref(`/usuario_contatos/${emailUsuarioAutenticadoB64}`)
            .push({ email: email, nome: dadosUsuario.nome })
            .then(() => adicionaContatoSucesso(dispatch))
            .catch(erro => adicionaContatoSucesso(erro.messsage, dispatch));
        } else {
          adicionaContatoErro(
            "E-mail informado não corresponde a um usuário válido",
            dispatch
          );
        }
      });
  };
};

const adicionaContatoSucesso = dispatch =>
  dispatch({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: true
  });

const adicionaContatoErro = (erro, dispatch) =>
  dispatch({
    type: ADICIONA_CONTATO_ERRO,
    payload: erro
  });

export const habilitaInclusaoContao = () => ({
  type: ADICIONA_CONTATO_SUCESSO,
  payload: false
});

export const contatosUsuarioFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    let emailUsuarioB64 = b64.encode(currentUser.email);

    firebase
      .database()
      .ref(`/usuario_contatos/${emailUsuarioB64}`)
      .on("value", snapshot => {
        //var lista = _.values(snapshot.val());
        var lista = _.map(snapshot.val(), (val, key) => {
          return { ...val, key };
        });
        dispatch({
          type: LISTA_CONTATO_USUARIO,
          payload: lista
        });
      });
  };
};

export const modificaMensagem = texto => ({
  type: MODIFICA_MENSAGEM,
  payload: texto
});

export const enviaMensagem = (mensagem, nomeContato, emailContato) => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    let emailUsuarioB64 = b64.encode(currentUser.email);
    let emailContatoB64 = b64.encode(emailContato);

    try {
      await firebase
        .database()
        .ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
        .push({
          mensagem: mensagem,
          tipo: "e"
        });

      await firebase
        .database()
        .ref(`/mensagens/${emailContatoB64}/${emailUsuarioB64}`)
        .push({
          mensagem: mensagem,
          tipo: "r"
        });

      dispatch({ type: ENVIA_MENSAGEM });

      await firebase
        .database()
        .ref(`/usuario_conversas/${emailUsuarioB64}/${emailContatoB64}`)
        .set({
          nome: nomeContato,
          email: emailContato
        });

      var snapshot = await firebase
        .database()
        .ref(`/contatos/${emailUsuarioB64}`)
        .once("value");

      const dadosUsuario = _.first(_.values(snapshot.val()));

      await firebase
        .database()
        .ref(`/usuario_conversas/${emailContatoB64}/${emailUsuarioB64}`)
        .set({
          nome: dadosUsuario.nome,
          email: currentUser.email
        });
    } catch (erro) {
      console.log(erro);
    }
  };
};

export const conversaUsuarioFetch = emailContato => {
  const { currentUser } = firebase.auth();
  const emailUsuarioB64 = b64.encode(currentUser.email);
  const emailContatoB64 = b64.encode(emailContato);

  return dispatch => {
    firebase
      .database()
      .ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
      .on("value", snapshot => {
        var conversa = _.map(snapshot.val(), (val, key) => {
          return { ...val, key };
        });

        dispatch({
          type: LISTA_CONVERSA_USUARIO,
          payload: conversa
        });
      });
  };
};

export const limpaConversa = () => {
  return {
    type: LIMPA_CONVERSA
  };
};

export const conversasAtivasUsuarioFetch = () => {
  const { currentUser } = firebase.auth();
  const emailUsuarioB64 = b64.encode(currentUser.email);

  return async dispatch => {
    firebase
      .database()
      .ref(`/usuario_conversas/${emailUsuarioB64}`)
      .on("value", snapshot => {
        var listaConversasAtivas = _.map(snapshot.val(), (val, key) => {
          return { ...val, key };
        });

        dispatch({
          type: LISTA_CONVERSAS_ATIVAS_USUARIO,
          payload: listaConversasAtivas
        });
      });
  };
};

export const deslogar = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Actions.pop();
        dispatch({ type: "logout_sucesso" });
      })
      .catch(erro => console.log(erro));
  };
};
