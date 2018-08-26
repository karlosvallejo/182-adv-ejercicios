import * as React from 'react';
import './RegisterForm.css';
import {ChangeEvent, Component, FormEvent} from "react";
import {firefireStore} from "../../stores/FirestoreDB";
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
        firefireStore.collection('users').add({
            userName: this.state.userName,
            password: this.state.password
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            store.authenticate(this.state.userName, this.state.password).then((complete) =>{

            }).catch((error: string) => {
                alert(error);
            });
            this.setState({
                userName:'',
                password: ''
            });
        })
        .catch((error) => {
             console.error("Error adding document: ", error);
             alert(error);
             this.setState({
                userName:'',
                password: ''
            });
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