import { eventosRef } from './eventos';

const SUBEVENTOS = 'Subeventos';
const SUBEVENTOS_PARTICIPANTES = 'SubeventoParticipantes';

export const getSubeventoById = (idEvento, idSubevento) => {
  return eventosRef.doc(idEvento).collection(SUBEVENTOS).doc(idSubevento).get();
};

export const getSubEventos = idEvento => {
  return eventosRef.doc(idEvento).collection(SUBEVENTOS).get();
};

export const submit = (idEvento, subevento) => {
  return eventosRef.doc(idEvento).collection(SUBEVENTOS).add(subevento);
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
    .doc(participante.uid)
    .set(participante);
};
