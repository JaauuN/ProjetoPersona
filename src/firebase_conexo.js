//Esta é a parte de importação Padrão do Firebase em Aplicações Web

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries << (SALVOU MINHA VIDA)
// https://firebase.google.com/docs/auth/web/start?hl=pt-br&authuser=0

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcMekT_vN_HtnQjkYRDUWo6L3HiQC3zPI",
  authDomain: "projetomenu-database.firebaseapp.com",
  projectId: "projetomenu-database",
  storageBucket: "projetomenu-database.firebasestorage.app",
  messagingSenderId: "1072703687586",
  appId: "1:1072703687586:web:af36bc198196ae2c7f00fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}