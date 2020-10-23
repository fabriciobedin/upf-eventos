import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const usuariosRef = db.collection('Users');
const eventosRef = db.collection('Eventos');
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const ORGANIZADORES = 'Organizadores';

export const cadastrarOrganizador = (idEvento, organizador) => {
  return eventosRef.doc(idEvento).update({
    organizadores: organizador
  });
}

export const adicionarOrganizador = (idEvento, organizador) => {
  return eventosRef.doc(idEvento).update({
    organizadores: firebase.firestore.FieldValue.arrayUnion(organizador)
  });
};

export const getOrganizadoresByEvento = idEvento => {
  return eventosRef.doc(idEvento).get();
};

export const submit = (organizador, id, idEvento) => {
  if(id) {
    organizador.updatedAt = timestamp;
    return usuariosRef.doc(id).update(organizador);
  }
  organizador.createdAt = timestamp;
  return usuariosRef.add(organizador);
};

export const remove = (idEvento, organizadorId) => {
  return eventosRef
    .doc(idEvento)
    .collection('Organizadores')
    .doc(organizadorId)
    .delete();
};
