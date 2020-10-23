import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/firestore';

import firebase from '../services/firebase';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    const storagedUser = localStorage.getItem('@upf-eventos:user');
    if (!storagedUser || storagedUser === 'undefined') return;

    setUser(JSON.parse(storagedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('@upf-eventos:user', JSON.stringify(user));
    } else {
      localStorage.removeItem('@upf-eventos:user');
    }
  }, [user]);

  const handleAuthErrorMessage = useCallback(errorCode => {
    return (
      {
        'auth/wrong-password': 'Senha incorreta',
        'auth/invalid-email': 'Email inválido',
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/user-disabled': 'Usuário desativado',
        'auth/email-already-in-use': 'Usuário já está em uso',
        'auth/operation-not-allowed': 'Operação não permitida',
        'auth/weak-password': 'Senha muito fraca'
      }[errorCode] || `Erro desconhecido ${errorCode}`
    );
  }, []);

  const signIn = useCallback(({ email, password }) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        firebase
          .firestore()
          .collection('Users')
          .doc(res.user.uid)
          .get()
          .then(FbUser => setUser(FbUser.data()))
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw new Error(handleAuthErrorMessage(err.code));
      });
  }, [handleAuthErrorMessage]);

  const signOut = useCallback(() => {
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
          throw err;
        });
    },
    [history]
  );

  const reauthenticate = useCallback(currentPassword => {
    const { currentUser } = firebase.auth();
    const cred = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    return currentUser.reauthenticateWithCredential(cred);
  }, []);

  const changePassword = useCallback(
    (oldpassword, password) => {
      return reauthenticate(oldpassword)
        .then(() => {
          const { currentUser } = firebase.auth();
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
          throw new Error(handleAuthErrorMessage(error.code));
        });
    },
    [handleAuthErrorMessage, reauthenticate]
  );

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, resetPassword, changePassword }}
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
