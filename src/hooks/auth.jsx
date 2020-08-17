import React, { createContext, useCallback, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import 'firebase/auth';
import firebase from '../services/firebase';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
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

  const signOut = useCallback(() => {
    localStorage.removeItem('@upf-eventos:user');
    setUser();
    Redirect('/');
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
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
