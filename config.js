const firebase = require("firebase/compat/app")
const firestore = require("firebase/compat/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyDch7TTmQ7fRKIhTXUX2zYzAWCMGz1g1Lc",
    authDomain: "fir-nodejs-d8f3d.firebaseapp.com",
    projectId: "fir-nodejs-d8f3d",
    storageBucket: "fir-nodejs-d8f3d.appspot.com",
    messagingSenderId: "254828854280",
    appId: "1:254828854280:web:17bea23794b7160f3965bd",
    measurementId: "G-600L022170"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db
const db = firebaseApp.firestore();
const User = db.collection("Users")
module.exports = User

