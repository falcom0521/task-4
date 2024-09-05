// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA_7pPQBC-71VypmbBIY-jXA4NMOc3eWc0",
  authDomain: "todo-5919c.firebaseapp.com",
  projectId: "todo-5919c",
  storageBucket: "YOUR_PROJECT_ID.todo-5919c.appspot.com.com",
  messagingSenderId: "583872871680",
  appId: "1:583872871680:web:2ebe0f142fe55cdfa107e5",
  measurementId: "G-KX0S0GC3R3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const messaging = firebase.messaging();

export { firestore, messaging };
