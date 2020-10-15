import firebase from './firebase';
import 'firebase/firestore';
import { eventosRef } from './eventos';

const db = firebase.firestore();
const subEventosRef = db.collection('subeventos');
const SUBEVENTOS = 'Subeventos';

// export const getSubEventos = () => {
//   return subEventosRef.get();
// };

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
  console.log('update subevento')
  return eventosRef
    .doc(idEvento)
    .collection(SUBEVENTOS)
    .doc(idSubevento)
    .update(subevento);
  // return subEventosRef.doc(idSubevento).update(subevento);
};

export const realizarInscricao = (idSubevento, participantes) => {
  return subEventosRef.doc(idSubevento).update({
    participantes: participantes
  });
};
