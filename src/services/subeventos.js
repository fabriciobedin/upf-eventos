import { eventosRef } from './eventos';

const SUBEVENTOS = 'Subeventos';
const SUBEVENTOS_PARTICIPANTES = 'SubeventoParticipantes';

export const getSubeventoById = (idEvento, idSubevento) => {
  return eventosRef.doc(idEvento).collection(SUBEVENTOS).doc(idSubevento).get();
};

export const getSubEventos = idEvento => {
  return eventosRef.doc(idEvento).collection(SUBEVENTOS).get();
};

export const getSubEventosSnapshot = idEvento => {
  return eventosRef.doc(idEvento).collection(SUBEVENTOS);
};

export const submit = (idEvento, subevento) => {
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(subevento.codigo)
    .set(subevento);
};

export const update = (idEvento, idSubevento, subevento) => {
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(idSubevento)
    .update(subevento);
};

export const realizarInscricao = (idEvento, idSubevento, participante) => {
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(idSubevento)
    .collection(SUBEVENTOS_PARTICIPANTES)
    .doc(participante.codigo)
    .set(participante);
};

export const getParticipantesInscritosSubEvento = (idEvento, idSubevento) => {
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(idSubevento)
    .collection(SUBEVENTOS_PARTICIPANTES)
    .get();
};

export const remove = (idEvento, idSubEvento) => {
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(idSubEvento)
    .delete();
};

export const removeParticipante = (idEvento, idSubEvento, idParticipante) => {
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(idSubEvento)
    .collection(SUBEVENTOS_PARTICIPANTES)
    .doc(idParticipante)
    .delete();
};
