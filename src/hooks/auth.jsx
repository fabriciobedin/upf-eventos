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

  const getMsgByErrorCode = (errorCode) => {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/invalid-email":
        return "E-mail invalido";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/user-disabled":
        return "Usuário desativado";
      case "auth/email-already-in-use":
        return "Usuário já esta em uso";
      case "auth/operation-not-allowed":
        return "Operação não permitida";
      case "auth/weak-password":
        return "Senha muito fraca. A senha deve conter no mínimo 6 caracteres!";
      default:
        return `Erro desconhecido ${errorCode}`;
    }
  }

  const reauthenticate = useCallback(currentPassword => {
    const currentUser = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    return currentUser.reauthenticateWithCredential(cred);
  }, []);

  const changePassword = useCallback((oldpassword, password) => {
    return reauthenticate(oldpassword)
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        return currentUser
          .updatePassword(password)
          .then(() => {
            console.log('Password updated!');
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        throw new Error(getMsgByErrorCode(error.code));
      });
  }, [reauthenticate]);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, register, resetPassword, changePassword }}
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
