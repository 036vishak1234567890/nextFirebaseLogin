import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXyWKIThgpJ99aAlv2j41jD8sjwrvyLA8",
  authDomain: "nextfire-964b1.firebaseapp.com",
  projectId: "nextfire-964b1",
  storageBucket: "nextfire-964b1.appspot.com",
  messagingSenderId: "734810164916",
  appId: "1:734810164916:web:decf26a0433b05295611e1",
  measurementId: "G-DK5CHRWZJ0"
}

    firebase.initializeApp(firebaseConfig);

export default firebase