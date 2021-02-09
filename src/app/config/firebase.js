import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "re-vents-2bd17.firebaseapp.com",
    databaseURL: "https://re-vents-2bd17-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "re-vents-2bd17",
    storageBucket: "re-vents-2bd17.appspot.com",
    messagingSenderId: "1086777375471",
    appId: "1:1086777375471:web:f19f918baa5df3936af91a"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;