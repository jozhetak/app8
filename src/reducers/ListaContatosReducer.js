import { LISTA_CONTATO_USUARIO } from "../actions/types";

const INITIAL_STATE = {
  listaContatos: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTA_CONTATO_USUARIO:
      return { ...state, listaContatos: action.payload };
    default:
      return state;
  }
};
