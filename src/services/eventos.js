import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const eventosRef = db.collection('eventos');
const subEventosRef = db.collection('subeventos');

export const getEventoById = idEvento => {
  return eventosRef.doc(idEvento).get();
};

export const getParticipantesByEvento = idEvento => {
  return eventosRef
  .doc(idEvento)
  .collection('participantes')
  .doc()
  .get();
}

export const getEventos = () => {
  return eventosRef.get();
};

export const getSubEventosByIdEvento = (idEvento) => {
  return subEventosRef.where('idEvento', '==', idEvento).get();
};

export const submit = evento => {
  return eventosRef.add(evento);
}

export const update = (idEvento, evento) => {
  console.log('update');
  return eventosRef.doc(idEvento).update(evento);
}

export const realizarInscricao = (idEvento, participantes) => {
  return eventosRef.doc(idEvento).update({
    participantes: participantes
  });
};
