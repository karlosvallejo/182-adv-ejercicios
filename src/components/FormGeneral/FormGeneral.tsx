import * as React from 'react';

import './FormGeneral.css';
import {Component} from "react";
import {ChangeEvent} from "react";
import {FormEvent} from "react";
import {Link} from "react-router-dom";

interface IGeneralFormProps {
    title: string;
    buttonText: string;
    createAccount: boolean;
    callbackAction: (user: string, pass: string) => void;
}

interface IGeneralLoginForm  {
    userName?: string;
    password?: string;
}


export class FormGeneral extends Component<IGeneralFormProps, IGeneralLoginForm>{

    constructor(props: IGeneralFormProps){
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
    }

    makeCall = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.props.callbackAction(this.state.userName, this.state.password);
        this.setState({
            userName:'',
            password: ''
        });
    };

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

        return <div className="LoginFormDiv">
            <h2>{this.props.title}</h2>
            <form onSubmit={this.makeCall} className={'LoginForm'}>
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
                <button className={'Button ButtonLogin'} type="submit">{this.props.buttonText}</button>
                {this.props.createAccount?  <Link className={'redirectLink Button ButtonRegister'} to={'/Registro'}><div>CREATE ACCOUNT</div></Link>: <Link className={'redirectLink Button ButtonRegister'} to={'/'}><div>BACK TO LOGIN</div></Link>}
            </form>
        </div>;
    }
}