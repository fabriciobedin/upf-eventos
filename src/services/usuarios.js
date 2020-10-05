import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const usersRef = db.collection('Users');

export const getUserById = idEvento => {
  return usersRef.doc(idEvento).get();
};

export const getUsers = () => {
  return usersRef.orderBy('name').get();
};
