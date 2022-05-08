import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBOA-1ItL7cePocLNp6Eyd_POt13COpPYc"/* process.env.REACT_APP_API_KEY */,
    authDomain: "cwave-a07c7.firebaseapp.com"/* process.env.REACT_APP_AUTH_DOMAIN */,
    projectId: "cwave-a07c7"/* process.env.REACT_APP_PROJECT_ID */,
    storageBucket: "cwave-a07c7.appspot.com"/* process.env.REACT_APP_STORAGE_BUCKET */,
    messagingSenderId: "83061927124" /* process.env.REACT_APP_MESSAGIN_ID */,
    appId: "1:83061927124:web:0ac9b822e4b18e39fd1f41" /* process.env.REACT_APP_APP_ID */,
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
