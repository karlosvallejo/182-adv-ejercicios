import * as React from "react";
import { Component } from 'react'
import './TransaccionesForm.css';
import {FormEvent} from "react";
import {store} from "../../stores/Store";
import {ChangeEvent} from "react";
import {sendTransaction} from "../../stores/FirestoreDB";


interface IStateTransaccionesForm  {
    name?: string;
    amount?: number;
}


export class TransaccionesForm extends Component<{}, IStateTransaccionesForm> {

    constructor(props: any){
        super(props);
        this.state = {
            name: '',
            amount: 0,
        }

    }

    makeTransaction = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
            if(store.balance - this.state.amount >= 0) {
               sendTransaction(this.state.name, store.userName, this.state.amount);
            } else {
                alert('No tienes los suficientes fondos');
            }
            this.setState({
                name:'',
                amount: 0
            });
    };

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

        return <div className="LoginForm">
            <h1>Enviar</h1>
            <form onSubmit={this.makeTransaction}>
                <input
                    type="text"
                    name="name"
                    placeholder="Receiver name"
                    onChange={this.updateInput}
                    value={this.state.name}
                />
                <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    onChange={this.updateInput}
                    value={this.state.amount}
                />
                <button type="submit">Submit</button>
            </form>
        </div>;
    }

}