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
  const [userData, setUserData] = useState([]);

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
    userData,
    signup,
    signin,
    logout,
  };

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    if (currentUser) {
      const db = getFirestore();
      const usersCollection = db.collection("users");
      const selectedUser = usersCollection.doc(currentUser.uid);

      const getUserFromFirestore = async () => {
        const response = await selectedUser.get();
        if (response.exists) {
          setUserData(response.data());
        }
      };
      getUserFromFirestore();
    } else {
      setUserData([]);
    }

    return () => unsuscribe;
  }, [currentUser]);

  return (
    <>
      <AuthContext.Provider value={value}>
        {!isLoading && children}
      </AuthContext.Provider>
    </>
  );
};
