import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const participantesRef = db.collection('participantes');

export const getParticipanteById = idParticipante => {
  return participantesRef.doc(idParticipante).get();
};

export const getParticipantes = () => {
  return participantesRef.get();
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
  if(id) {
    return participantesRef.doc(id).update(participante);
  }
  return participantesRef.add(participante);
};
