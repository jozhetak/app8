import {
  MODIFICA_ADICIONA_CONTATO_EMAIL,
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  ADICIONA_CONTATO_LOADING,
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM
} from "../actions/types";

const INITIAL_STATE = {
  adiciona_contato_email: "",
  erroAdicionarContato: "",
  adicionarContatoLoading: false,
  resultadoAdicaoContato: false,
  mensagem: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_ADICIONA_CONTATO_EMAIL:
      return { ...state, adiciona_contato_email: action.payload };
    case ADICIONA_CONTATO_ERRO:
      return {
        ...state,
        erroAdicionarContato: action.payload,
        adicionarContatoLoading: false
      };
    case ADICIONA_CONTATO_SUCESSO:
      return {
        ...state,
        erroAdicionarContato: "",
        adicionarContatoLoading: false,
        resultadoAdicaoContato: action.payload,
        adiciona_contato_email: ""
      };
    case ADICIONA_CONTATO_LOADING:
      return { ...state, adicionarContatoLoading: true };
    case MODIFICA_MENSAGEM:
      return { ...state, mensagem: action.payload };
    case ENVIA_MENSAGEM:
      return { ...state, mensagem: "" };
    default:
      return state;
  }
};
