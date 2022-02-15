import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9EUhyWeobX0HgqP3LoZ7sFzNOUyaZmbg",
  authDomain: "coderhouse-ecommerce-31d97.firebaseapp.com",
  projectId: "coderhouse-ecommerce-31d97",
  storageBucket: "coderhouse-ecommerce-31d97.appspot.com",
  messagingSenderId: "671689958028",
  appId: "1:671689958028:web:4a3c1779942cfaff7411a9",
};

const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => app;

export const getFirestore = () => firebase.firestore(app);
