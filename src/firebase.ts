import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8SMtVLuptkWy7KBsDXqql-jv_LEKj9ro",
  authDomain: "invitacion-emilio-2d5cd.firebaseapp.com",
  projectId: "invitacion-emilio-2d5cd",
  storageBucket: "invitacion-emilio-2d5cd.appspot.com",
  messagingSenderId: "970341180733",
  appId: "1:970341180733:web:9580fb4c39673ae3d1d154"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);