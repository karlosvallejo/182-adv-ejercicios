import * as firebase from "firebase/app";
import  'firebase/firestore'
import {store} from "./Store";




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



export const userExits =(user: string, password?: string): Promise<firebase.firestore.QuerySnapshot> => {

    if(password == null) {
        return new Promise<firebase.firestore.QuerySnapshot>((resolve, reject) => {
            const usersRef = firefireStore.collection("users");
            usersRef.where("userName", "==", user).get().then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if(querySnapshot.size === 0){
                    return reject(querySnapshot);
                }

                return resolve(querySnapshot);

            }).catch((error) =>{
                reject(error);
            });
        });
    }
    return new Promise<firebase.firestore.QuerySnapshot>((resolve, reject) => {
        const usersRef = firefireStore.collection("users");
        usersRef.where("userName", "==", user).where("password", "==", password).get().then((querySnapshot: firebase.firestore.QuerySnapshot) => {
            if(querySnapshot.size === 0){
                return reject(querySnapshot);
            }

            return resolve(querySnapshot);

        }).catch((error) =>{
            reject(error);
        });
    });
};

export const sendTransaction = (receiver: string, sender: string, amount: number) =>{

    userExits(receiver).then((snapshot: firebase.firestore.QuerySnapshot) =>{

        const valueSring: string = amount.toString();
        const value: number = parseInt(valueSring);

        firefireStore.collection('transactions').add({
            input: sender,
            output: receiver,
            value: value
        }).then((docRef: firebase.firestore.DocumentReference) => {
            console.log("Document written with ID: ", docRef.id);

        }).catch((error) => {
            console.error("Error adding document: ", error);
            alert(error.toString());
        });

    }).catch((error) =>{

        if(error instanceof firebase.firestore.QuerySnapshot) {
            alert('el usuario a quien intentas mandar no existe');
        } else {
            console.log(error);
            alert(error.toString());
        }

    });



};






