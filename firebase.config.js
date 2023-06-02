// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQfOdv-fOJPmMGJULxcvDVqIeREz-H96I",
  authDomain: "todo-2bc67.firebaseapp.com",
  projectId: "todo-2bc67",
  storageBucket: "todo-2bc67.appspot.com",
  messagingSenderId: "1029573570989",
  appId: "1:1029573570989:web:55a4015db56584985fb124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app