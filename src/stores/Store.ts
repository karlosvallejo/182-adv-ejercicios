import { observable, action, computed } from 'mobx';
import {firebase, userExits, firefireStore} from "./FirestoreDB";




class Store{

    @observable private Authenticated: boolean = false;

    @observable private username: string = '';

    @observable private currentBalance: number = 0;

    @observable inputTransactions: firebase.firestore.QueryDocumentSnapshot[] = [];
    @observable outTransactions: firebase.firestore.QueryDocumentSnapshot[] = [];

    private negativeBalance: number = 0;
    private positiveBalance: number = 0;


    @action authenticate(user: string, password: string): Promise<string> {
        return new Promise<string>(((resolve, reject) => {
            userExits(user, password).then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
                    this.Authenticated = true;
                    this.username = doc.get('userName');
                    resolve(doc.data().toString());
                });
            }).catch( (error) => {
                if(error instanceof firebase.firestore.QuerySnapshot) {
                  return  reject('Usuario o contraseña incorrecto')
                }
                reject (error.toString());
            })
        }));
    }


    @action checkForBalance() {

        const transactionsRef = firefireStore.collection("transactions");

        transactionsRef.where("input", "==", this.username).onSnapshot( (querySnapshot: firebase.firestore.QuerySnapshot) => {

            console.log(querySnapshot);

            this.inputTransactions = [];
            this.negativeBalance = 0;

            querySnapshot.forEach((inputTransactions: firebase.firestore.QueryDocumentSnapshot) => {
                this.inputTransactions.push(inputTransactions);
                this.negativeBalance += inputTransactions.get('value');
            });

            this.currentBalance = this.positiveBalance - this.negativeBalance;

        },(error) => {
            console.log(error);
            alert(error.toString());
        });

        transactionsRef.where("output", "==", this.username).onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {

            this.outTransactions = [];
            this.positiveBalance = 0;

            querySnapshot.forEach((outTransactions: firebase.firestore.QueryDocumentSnapshot) => {
                this.positiveBalance += outTransactions.get('value');
                this.outTransactions.push(outTransactions);
            });

            this.currentBalance = this.positiveBalance - this.negativeBalance;


        },(error) => {
            console.log(error);
            alert(error.toString());
        });


    }



    @action signout(cb: any) {
        this.Authenticated = false;
        setTimeout(cb, 100) // fake async
    }

    @computed get isAuthenticated(): boolean {
        return this.Authenticated;
    }

    @computed get userName() {
        return this.username;
    }

    @computed get balance() {

        return this.currentBalance;
    }

}


export const store = new Store();