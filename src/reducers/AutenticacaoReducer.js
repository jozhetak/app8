import {
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  MODIFICA_NOME,
  SUCESSO_CADASTRO,
  ERRO_CADASTRO,
  LOGIN_USUARIO_SUCESSO,
  LOGIN_USUARIO_ERRO,
  LOGIN_EM_ANDAMENTO,
  CADASTRO_EM_ANDAMENTO
} from "../actions/types";

const INITIAL_STATE = {
  nome: "",
  email: "gabriel@teste.com.br",
  senha: "123456",
  erroCadastro: "",
  erroLogin: "",
  loadingLogin: false,
  loadingCadastro: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_EMAIL:
      return { ...state, email: action.payload };
    case MODIFICA_SENHA:
      return { ...state, senha: action.payload };
    case MODIFICA_NOME:
      return { ...state, nome: action.payload };
    case SUCESSO_CADASTRO:
      return {
        ...state,
        erroCadastro: "",
        nome: "",
        senha: "",
        loadingCadastro: false
      };
    case ERRO_CADASTRO:
      return { ...state, erroCadastro: action.payload, loadingCadastro: false };
    case LOGIN_USUARIO_SUCESSO:
      return {
        ...state,
        erroLogin: "",
        loadingLogin: false,
        senha: "",
        nome: ""
      };
    case LOGIN_USUARIO_ERRO:
      return {
        ...state,
        erroLogin: action.payload,
        loadingLogin: false,
        senha: "",
        nome: ""
      };
    case LOGIN_EM_ANDAMENTO:
      return { ...state, loadingLogin: true };
    case CADASTRO_EM_ANDAMENTO:
      return { ...state, loadingCadastro: true };
    default:
      return state;
  }
};
