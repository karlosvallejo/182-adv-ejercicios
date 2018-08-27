import * as React from 'react';
import './RegisterForm.css';
import {ChangeEvent, Component, FormEvent} from "react";
import {firefireStore, userExits, firebase} from "../../stores/FirestoreDB";
import {store} from "../../stores/Store";



interface HeaderProps {
    title: string;
}
interface IStateRegisterForm  {
    userName?: string;
    password?: string;
}

export class RegisterForm extends Component<HeaderProps, IStateRegisterForm>{

    constructor(props: HeaderProps){
        super(props);
        this.state = {
            userName: '',
            password: '',
        }

    }

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    addUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userName: string = this.state.userName;
        const password: string = this.state.password;
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

        this.setState({
            userName:'',
            password: ''
        });

    };

    render() {

        return <div className="RegisterForm">
            <h1>{this.props.title}</h1>
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    onChange={this.updateInput}
                    value={this.state.userName}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.updateInput}
                    value={this.state.password}
                />
                <button type="submit">Submit</button>
            </form>
        </div>;
    }
}