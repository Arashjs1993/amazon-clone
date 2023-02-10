import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDmETlx3NMATI4Q9zu9fYEXgmo8Vey7yJA",
    authDomain: "challenge-2cc25.firebaseapp.com",
    projectId: "challenge-2cc25",
    storageBucket: "challenge-2cc25.appspot.com",
    messagingSenderId: "577982316851",
    appId: "1:577982316851:web:21c750e85c68d766207e46",
    measurementId: "G-SR4RWV21TJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};
