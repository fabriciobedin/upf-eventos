import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
export const eventosRef = db.collection('Eventos');

export const getEventoById = idEvento => {
  return eventosRef.doc(idEvento).get();
};

export const getEventos = () => {
  const user = getUsuarioLogado();

  if (user && user?.nivelAcesso==='2') {
    // if (user && !user?.nivelAcesso) {
    return eventosRef.where('organizadores', 'array-contains', user.uid);
  }
  return eventosRef;
};

export const submit = async evento => {
  const user = await getUsuarioLogado();
  evento.organizadores = [user.uid];
  return eventosRef.doc(evento.codigo).set(evento);
};

export const update = (idEvento, evento) => {
  return eventosRef.doc(idEvento).update(evento);
};

export const realizarInscricao = (idEvento, participantes) => {
  return eventosRef.doc(idEvento).update({
    participantes: participantes
  });
};

export const adicionarOrganizador = (idEvento, organizador) => {
  return eventosRef.doc(idEvento).update({
    organizadores: firebase.firestore.FieldValue.arrayUnion(organizador)
  });
};

const getUsuarioLogado = () => {
  return JSON.parse(localStorage.getItem('@upf-eventos:user')) || {};
};

export const remove = (idEvento) => {
  return eventosRef
    .doc(idEvento)
    .delete();
};
