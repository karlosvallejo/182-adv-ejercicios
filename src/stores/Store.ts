import { observable, action, computed } from 'mobx';
import {firebase, userExits, firefireStore} from "./FirestoreDB";




class Store{

    @observable private Authenticated: boolean = false;

    @observable private username: string = '';

    @observable private currentBalance: number = 0;

    @observable inputTransactions: firebase.firestore.QueryDocumentSnapshot[] = [];
    @observable outTransactions: firebase.firestore.QueryDocumentSnapshot[] = [];

    @observable mempoolTransactionsAll: firebase.firestore.QueryDocumentSnapshot[] = [];
    @observable mempoolInputUserTransactions: firebase.firestore.QueryDocumentSnapshot[] = [];

    private negativeBalance: number = 0;
    private positiveBalance: number = 0;
    private mempoolBalance: number = 0;

    private inputTransactionListener: () => void;
    private outputTransactionListener: () => void;
    private mempoolTransactionListener: () => void;


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

    @action subscribeChanges(){
        if( ((this.inputTransactionListener || this.outputTransactionListener || this.mempoolTransactionListener) == null || undefined) && (localStorage.getItem('userName') != null || undefined)) {
            this.username = localStorage.getItem('userName');
            this.Authenticated = true;
            store.checkForBalance();
            store.mempoolTransactions();
        }
    }

    saveLocalStorage(){
        localStorage.setItem('userName',this.userName);
    }


    @action checkForBalance() {

       const transactionsRef = firefireStore.collection("transactions");

       this.inputTransactionListener = transactionsRef.where("input", "==", this.userName).onSnapshot( (querySnapshot: firebase.firestore.QuerySnapshot) => {

            this.inputTransactions = [];
            this.negativeBalance = 0;

            querySnapshot.forEach((inputTransactions: firebase.firestore.QueryDocumentSnapshot) => {
                this.inputTransactions.push(inputTransactions);
                this.negativeBalance += inputTransactions.get('value');
            });

            this.currentBalance = this.positiveBalance - (this.negativeBalance + this.mempoolBalance);

       },(error) => {
            console.log(error);
            alert(error.toString());
       });

       this.outputTransactionListener = transactionsRef.where("output", "==", this.userName).onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {

            this.outTransactions = [];
            this.positiveBalance = 0;

            querySnapshot.forEach((outTransactions: firebase.firestore.QueryDocumentSnapshot) => {
                this.positiveBalance += outTransactions.get('value');
                this.outTransactions.push(outTransactions);
            });

            this.currentBalance = this.positiveBalance - (this.negativeBalance + this.mempoolBalance);


       },(error) => {
            console.log(error);
            alert(error.toString());
       });


    }

    @action mempoolTransactions() {

        const transactionsRef = firefireStore.collection("mempool");

        this.mempoolTransactionListener = transactionsRef.onSnapshot( (querySnapshot: firebase.firestore.QuerySnapshot) => {

            this.mempoolInputUserTransactions = [];
            this.mempoolTransactionsAll = [];
            this.mempoolBalance = 0;

            querySnapshot.forEach((memTransactions: firebase.firestore.QueryDocumentSnapshot) => {




                if(memTransactions.get('input') === this.userName){
                    this.mempoolInputUserTransactions.push(memTransactions);
                    this.mempoolBalance += memTransactions.get('value');
                } else {
                    this.mempoolTransactionsAll.push(memTransactions);
                }

            });

            this.currentBalance = this.positiveBalance - (this.negativeBalance + this.mempoolBalance);

        },(error) => {
            console.log(error);
            alert(error.toString());
        });
    }

    @action unsubscribeAll(){
        this.inputTransactionListener();
        this.outputTransactionListener();
        this.mempoolTransactionListener();
    }




    @action signout(cb: any) {
        this.Authenticated = false;
        this.username = '';
        this.currentBalance = 0;
        this.negativeBalance = 0;
        this.positiveBalance = 0;
        this.mempoolBalance = 0;
        this.unsubscribeAll();
        localStorage.clear();
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