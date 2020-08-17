import firebase from 'firebase/app';
import firebaseConfig from '../config/firebase';
import firestore from 'firebase/firestore';

firebase.initializeApp(firebaseConfig);


export default firebase;
