import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/firestore';

import firebase from '../services/firebase';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState(() => {
    const userLocal = JSON.parse(localStorage.getItem('@upf-eventos:user'));
    if (userLocal?.user?.stsTokenManager) {
      return { user: userLocal };
    }
    return null;
  });

  const signIn = useCallback(({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setUser(res);
        localStorage.setItem('@upf-eventos:user', JSON.stringify(res));
      })
      .catch(() => {
        setUser();
      });
  }, []);

  const register = useCallback(
    ({ name, email, password }) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          setUser(res);
          localStorage.setItem('@upf-eventos:user', JSON.stringify(res));
          const db = firebase.firestore();
          db.collection('Users')
            .doc(res.user.uid)
            .set({ email, name })
            .then(() => {
              history.push('/');
            });
        })
        .catch(() => {
          setUser();
        });
    },
    [history]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@upf-eventos:user');
    setUser();
    history.push('/');
  }, [history]);

  const resetPassword = useCallback(
    email => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('Link sent');
          history.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    },
    [history]
  );

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, register, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthProvider is requered to use useAuth');
  }
  return context;
}

export { AuthProvider, useAuth };
