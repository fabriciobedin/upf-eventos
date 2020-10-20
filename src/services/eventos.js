import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
export const eventosRef = db.collection('Eventos');

export const getEventoById = idEvento => {
  return eventosRef.doc(idEvento).get();
};

export const getParticipantesByEvento = idEvento => {
  return eventosRef.doc(idEvento).collection('Participantes');
};

export const getEventos = async () => {
  const user = await getUsuarioLogado();
  if (user && !user?.nivelAcesso) {
    return eventosRef.where('organizadores', 'array-contains', user.uid).get();
  }
  return eventosRef.get();
};

export const submit = async evento => {
  const user = await getUsuarioLogado();
  evento.organizadores = [user.uid];
  return eventosRef.add(evento);
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

export const submitParticipante = (idEvento, participante, idParticipante) => {
  if (idParticipante) {
    return eventosRef
      .doc(idEvento)
      .collection('Participantes')
      .doc(idParticipante)
      .update(participante);
  }
  return eventosRef.doc(idEvento).collection('Participantes').add(participante);
};

const getUsuarioLogado = () => {
  const { user } = !!localStorage.getItem('@upf-eventos:user') ? JSON.parse(localStorage.getItem('@upf-eventos:user')) : {};
  return user;
};
