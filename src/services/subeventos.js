import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const subEventosRef = db.collection('subeventos');

export const getSubEventos = () => {
  return subEventosRef.get();
};

export const getSubeventoById = idSubevento => {
  return subEventosRef.doc(idSubevento).get();
};

export const getSubEventosByIdEvento = (idEvento) => {
  return subEventosRef.where('idEvento', '==', idEvento).get();
};

export const submit = subevento => {
  return subEventosRef.add(subevento);
}

export const update = (idSubevento, subevento) => {
  return subEventosRef.doc(idSubevento).update(subevento);

}

export const realizarInscricao = (idSubevento, participantes) => {
  return subEventosRef.doc(idSubevento).update({
    participantes: participantes
  });
};
