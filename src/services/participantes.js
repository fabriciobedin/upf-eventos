import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const participantesRef = db.collection('participantes');
const eventosRef = db.collection('Eventos');
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const getParticipanteById = (idEvento, idParticipante) => {
  console.log('idEvento', idEvento)
  console.log('idParticipante', idParticipante)
  return eventosRef
    .doc(idEvento)
    .collection('Participantes')
    .doc(idParticipante)
    .get();
};

export const getParticipantes = () => {
  return participantesRef.get();
};

export const getParticipantesPaginado = () => {
  return participantesRef.orderBy('createdAt');
};

export const buscaPorCodigoDocumento = (codigo, documento) => {
  return participantesRef
    .where('codigo', '==', codigo)
    .where('documento', '==', documento)
    .get();
};

export const buscaPorIdEstrangeiro = (codigo, idEstrangeiro) => {
  return participantesRef
    .where('codigo', '==', codigo)
    .where('idEstrangeiro', '==', idEstrangeiro)
    .get();
};

export const submit = (participante, id) => {
  if (id) {
    participante.updatedAt = timestamp;
    return participantesRef.doc(id).update(participante);
  }
  participante.createdAt = timestamp;
  return participantesRef.add(participante);
};

export const remove = participanteId => {
  return participantesRef.doc(participanteId).delete();
};
