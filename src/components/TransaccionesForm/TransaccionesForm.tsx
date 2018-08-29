import * as React from "react";
import { Component } from 'react'
import './TransaccionesForm.css';
import {FormEvent} from "react";
import {store} from "../../stores/Store";
import {ChangeEvent} from "react";
import {sendTransaction} from "../../stores/FirestoreDB";


interface IStateTransaccionesForm  {
    name?: string;
    amount?: string;
}


export class TransaccionesForm extends Component<{}, IStateTransaccionesForm> {

    constructor(props: any){
        super(props);
        this.state = {
            name: '',
            amount: '',
        }

    }

    makeTransaction = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
            const toInt = parseInt(this.state.amount);
            if(store.balance - toInt >= 0) {
               sendTransaction(this.state.name, store.userName, toInt);
            } else {
                alert('No tienes los suficientes fondos');
            }
            this.setState({
                name:'',
                amount: ''
            });
    };

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

        return <div className="transiDivGeneral">
            <div className={'formAndTitleDiv'}>
            <h1>Enviar</h1>
            <form onSubmit={this.makeTransaction} className={'LoginForm'}>
                <input
                    className={'formInput'}
                    type="text"
                    name="name"
                    placeholder="Receiver name"
                    onChange={this.updateInput}
                    value={this.state.name}
                />
                <input
                    className={'formInput'}
                    type="text"
                    pattern="[0-9]*"
                    name="amount"
                    placeholder="Amount - only integers"
                    onChange={this.updateInput}
                    value={this.state.amount}
                />
                <button type="submit" className={'Button ButtonLogin'}>Submit</button>
            </form>
            </div>
        </div>;
    }

}