import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import app from 'firebase/app';

//this is intentionally the wrong config information, need the information from the correct firebase in order to work.
var firebaseConfig = {
  apiKey: "AIzaSyBdjeWpgPaqht7uOIqoR8AVXfq6nThe2Qc",
  authDomain: "myfirebase-4ae89.firebaseapp.com",
  databaseURL: "https://myfirebase-4ae89.firebaseio.com",
  projectId: "myfirebase-4ae89",
  storageBucket: "myfirebase-4ae89.appspot.com",
  messagingSenderId: "303469471618",
  appId: "1:303469471618:web:ad205a5f3c560332c2d19b",
  measurementId: "G-5FZ8RK7P2G"
};
// Initialize Firebase
  app.initializeApp(firebaseConfig);
  export const auth = app.auth();
  export const firestore = app.firestore();
  var storage = app.storage();
  export const storageRef = storage.ref();

  export default firebaseConfig;
