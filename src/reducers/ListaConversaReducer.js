import { LISTA_CONVERSA_USUARIO, LIMPA_CONVERSA, LISTA_CONVERSAS_ATIVAS_USUARIO } from "../actions/types";

const INITIAL_STATE = {
  conversa: [],
  listaConversasAtivas: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTA_CONVERSA_USUARIO:
      return { ...state, conversa: action.payload };
    case LIMPA_CONVERSA:
      return { ...state, conversa: [] };
    case LISTA_CONVERSAS_ATIVAS_USUARIO:
      return {... state, listaConversasAtivas: action.payload}
    default:
      return state;
  }
};
