import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase/index";
import { getFirestore } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const signup = (email, password, nombre, apellido, telefono) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const db = getFirestore();
        const USER = {
          email: email,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          wishlist: [],
        };

        db.collection("users").doc(userCredentials.user.uid).set(USER);
      });
  };

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const value = {
    currentUser,
    signup,
    signin,
    logout,
  };

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsuscribe;
  }, []);

  return (
    <>
      <AuthContext.Provider value={value}>
        {!isLoading && children}
      </AuthContext.Provider>
    </>
  );
};
