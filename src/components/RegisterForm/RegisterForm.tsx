import * as React from 'react';
import './RegisterForm.css';
import {Component} from "react";
import {firefireStore, userExits, firebase, sendTransaction} from "../../stores/FirestoreDB";
import {store} from "../../stores/Store";
import {FormGeneral} from "../FormGeneral/FormGeneral";



export class RegisterForm extends Component<{}, {}>{

    constructor(props: any){
        super(props);
    }




    addUser = (userName: string, password: string) => {
        userExits(userName).then((querySnapshot: firebase.firestore.QuerySnapshot) =>{
            querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
                alert('User Already Exits: ' + doc.get('userName'));
            });
        }).catch((error: any) => {
            if(error instanceof firebase.firestore.QuerySnapshot) {
                firefireStore.collection('users').add({
                    userName: userName,
                    password: password
                }).then((docRef: firebase.firestore.DocumentReference) => {
                    console.log("Document written with ID: ", docRef.id);
                    store.authenticate(userName, password).then((complete) =>{
                        sendTransaction(userName,'',50);
                        store.mempoolTransactions();
                        store.checkForBalance();
                        store.saveLocalStorage();
                    }).catch((error: string) => {
                        console.log(error);
                        alert(error.toString());
                    });

                }).catch((error) => {
                        console.error("Error adding document: ", error);
                        alert(error.toString());
                    });
            } else {
                console.log(error);
                alert(error.toString());
            }
        });

    };

    render() {

        return <FormGeneral title={'Create Account'} buttonText={'TAKE ME TO THE BLOCKCHAIN'} createAccount={false} callbackAction={this.addUser}/>
    }
}