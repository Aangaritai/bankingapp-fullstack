// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv0ZU580jqVHF_3RzY6iJY1BIKNxAmU9g",
  authDomain: "mitxpro-proyect.firebaseapp.com",
  databaseURL: "https://mitxpro-proyect-default-rtdb.firebaseio.com",
  projectId: "mitxpro-proyect",
  storageBucket: "mitxpro-proyect.appspot.com",
  messagingSenderId: "807231172649",
  appId: "1:807231172649:web:90ba689fa82a73d6ed2c38"
};

// Initialize Firebase
const authConfig = initializeApp(firebaseConfig);

export default authConfig;
