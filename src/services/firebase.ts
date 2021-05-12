import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
   apiKey: process.env.REACT_APP_APPIKEY,
   authDomain: process.env.REACT_APP_AUTHDOMAIN,
   projectId: process.env.REACT_APP_PROJECTID,
   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
   appId: process.env.REACT_APP_APPID,
   measurementId: process.env.REACT_APP_MEASUREMENTID
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, firebase, firestore, googleProvider }