import * as React from 'react';

import './LoginForm.css';
import {store} from "../../stores/Store";
import {Component} from "react";
import {Redirect} from "react-router";
import {Location} from "history";
import {observer} from "mobx-react";
import {ChangeEvent} from "react";
import {FormEvent} from "react";

interface ILoginFormProps {
    title: string;
    from: Location["state"];
}

interface IStateLoginForm  {
    userName?: string;
    password?: string;
}


export class LoginForm extends Component<ILoginFormProps, IStateLoginForm>{

    constructor(props: ILoginFormProps){
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
    }

    login = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        store.authenticate(this.state.userName, this.state.password).then((data: string) =>{
            store.checkForBalance();
            this.setState({
                userName:'',
                password: ''
            });
        }).catch((error: string) =>{
            alert(error);
            this.setState({
                userName:'',
                password: ''
            });
        })
    };

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

    const { from } = this.props.from|| { from: { pathname: '/' } };

    if (store.isAuthenticated === true) {
            return <Redirect to={from} />
    }

    return <div className="LoginForm">
        <h1>{this.props.title}</h1>
        <form onSubmit={this.login}>
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