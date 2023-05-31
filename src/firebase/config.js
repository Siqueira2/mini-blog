import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvUAsqyymlKqElNr4Wv2RhhDlHQM5r2X0",
  authDomain: "miniblog-ddd62.firebaseapp.com",
  projectId: "miniblog-ddd62",
  storageBucket: "miniblog-ddd62.appspot.com",
  messagingSenderId: "983995446172",
  appId: "1:983995446172:web:bd0e028dd15f8098fdce59",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)