import firebase from './firebase';
import 'firebase/firestore';
import { eventosRef } from './eventos';

const db = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const STATUS_CONFIRMADO = 'confirmado';
const PARTICIPANTES = 'Participantes';
const SUBEVENTOS = 'Subeventos';
const SUBEVENTOS_PARTICIPANTES = 'SubeventoParticipantes';

export const getParticipanteById = (idEvento, idParticipante) => {
  return eventosRef
    .doc(idEvento)
    .collection(PARTICIPANTES)
    .doc(idParticipante)
    .get();
};

export const getParticipantesByEvento = (idEvento, idSubevento) => {
  return eventosRef.doc(idEvento).collection(PARTICIPANTES).orderBy('nome');
};

export const buscaPorCodigoDocumento = (idEvento, codigo, documento) => {
  return eventosRef
    .doc(idEvento)
    .collection(PARTICIPANTES)
    .where('codigo', '==', codigo)
    .where('documento', '==', documento)
    .get();
};

export const buscaPorIdEstrangeiro = (idEvento, codigo, idEstrangeiro) => {
  return eventosRef
    .doc(idEvento)
    .collection(PARTICIPANTES)
    .where('codigo', '==', codigo)
    .where('idEstrangeiro', '==', idEstrangeiro)
    .get();
};

export const submitParticipante = (idEvento, participante, idParticipante) => {
  if (idParticipante) {
    return eventosRef
      .doc(idEvento)
      .collection('Participantes')
      .doc(idParticipante)
      .update(participante);
  }
  return eventosRef.doc(idEvento).collection('Participantes').doc(participante.codigo).set(participante);
};

export const possuiFrequencia = particpanteId => {
  return (
    db
      .collectionGroup('SubeventoParticipantes')
      .where('participanteId', '==', particpanteId)
      .where('status', '!=', STATUS_CONFIRMADO)
      .limit(1)
      .get()
  );
};

export const remove = (idEvento, participanteId) => {
  return eventosRef
    .doc(idEvento)
    .collection('Participantes')
    .doc(participanteId)
    .delete();
};

export const getParticipantesSubevento = (idEvento, idSubevento) => {
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(idSubevento)
    .collection(SUBEVENTOS_PARTICIPANTES)
    .orderBy('nome')
}

export const atulizaInscricaoSubevento = (idEvento, idParticipante, idSubevento )=>{

  return eventosRef
    .doc(idEvento)
    .collection(PARTICIPANTES)
    .doc(idParticipante)
    .update({
      subeventos: firebase.firestore.FieldValue.arrayUnion(idSubevento)
    });

}
