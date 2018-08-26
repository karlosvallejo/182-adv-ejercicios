import * as firebase from "firebase/app";
import  'firebase/firestore'




const app: firebase.app.App = firebase.initializeApp({
    apiKey: "AIzaSyCZ59sDP3twOkDGDVe2tlQRpxjfOYGlddY",
    authDomain: "tallerunowebavanzado.firebaseapp.com",
    databaseURL: "https://tallerunowebavanzado.firebaseio.com",
    projectId: "tallerunowebavanzado",
    storageBucket: "tallerunowebavanzado.appspot.com",
    messagingSenderId: "558951062638"
});



const fireStore: firebase.firestore.Firestore = app.firestore();

fireStore.settings({
    timestampsInSnapshots: true
});

export const firefireStore: firebase.firestore.Firestore = fireStore;

export {firebase};




