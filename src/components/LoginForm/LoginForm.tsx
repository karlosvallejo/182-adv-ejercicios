import * as React from 'react';

import './LoginForm.css';
import {store} from "../../stores/Store";
import {Component} from "react";
import {Redirect} from "react-router";
import {Location} from "history";
import {ChangeEvent} from "react";
import {FormEvent} from "react";
import {Link} from "react-router-dom";

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
            store.mempoolTransactions();
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

    return <div className="LoginFormDiv">
        <h2>{this.props.title}</h2>
        <form onSubmit={this.login} className={'LoginForm'}>
            <div className={'divInputs'}>
            <input className={'formInput'}
                type="text"
                name="userName"
                required={true}
                placeholder="User Name"
                onChange={this.updateInput}
                value={this.state.userName}
            />
            <input className={'formInput'}
                type="password"
                name="password"
                required={true}
                placeholder="Password"
                onChange={this.updateInput}
                value={this.state.password}
            />
            </div>
            <button className={'Button ButtonLogin'} type="submit">ENTER TO THE BLOCKCHAIN</button>
            <button className={'Button ButtonRegister'} type="button"><Link className={'redirectLink'} to={'/Registro'}>CREATE ACCOUNT</Link></button>
        </form>
    </div>;
    }
}