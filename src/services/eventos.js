import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const subEventosRef = db.collection('subeventos');
export const eventosRef = db.collection('Eventos');

const { user } = localStorage.getItem('@upf-eventos:user');


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


  // verificar se usuário é admin ou organizador
  // if(true) {
  //   implementar consulta passando organizador
  //   return eventosRef.where('organizadores', "array-contains-any", [{}]).get();
  // }

  return eventosRef.get();
};

export const submit = evento => {
  return eventosRef.add(evento);
}

export const update = (idEvento, evento) => {
  return eventosRef.doc(idEvento).update(evento);
}

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
    return eventosRef.doc(idEvento).collection('Participantes').doc(idParticipante).update(participante);
  }
  return eventosRef.doc(idEvento).collection('Participantes').add(participante);
};
