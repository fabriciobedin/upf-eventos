import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const organizadoresRef = db.collection('organizadores');
const eventosRef = db.collection('eventos');
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const getOrganizadorById = idOrganizador => {
  return organizadoresRef.doc(idOrganizador).get();
};

export const getOrganizadores = () => {
  return organizadoresRef.get();
};

export const cadastrarOrganizador = (idEvento, organizador) => {
  console.log(idEvento, organizador);
  return eventosRef.doc(idEvento).update({
    organizadores: organizador
  });
}

export const submit = (organizador, id) => {
  console.log(organizador);
  if(id) {
    organizador.updatedAt = timestamp;
    return organizadoresRef.doc(id).update(organizador);
  }
  organizador.createdAt = timestamp;
  return organizadoresRef.add(organizador);
};
