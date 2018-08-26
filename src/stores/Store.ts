import { observable, action, computed } from 'mobx';
import {firefireStore, firebase} from "./FirestoreDB";


class Store{

    @observable private Authenticated: boolean = false;

    @observable private username: string = '';


    @action authenticate(user: string, password: string): Promise<string> {
        return new Promise<string>(((resolve, reject) => {
            const usersRef = firefireStore.collection("users");
            usersRef.where("userName", "==", user).where("password", "==", password).get().then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if(querySnapshot.size === 0){
                 return reject('Usuario o contraseña Incorrecto');
                }
                querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
                    console.log(doc.data());
                    this.Authenticated = true;
                    this.username = doc.get('userName');
                    resolve(doc.id);
                });
            }).catch((error) =>{
                     reject(error);
            });
        }));
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

}


export const store = new Store();