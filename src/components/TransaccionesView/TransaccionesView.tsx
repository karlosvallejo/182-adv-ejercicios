import * as React from "react";
import { Component } from 'react'
import './TransaccionesView.css';

interface IPropsTransaccioneView {
    inputTransactions: Array<any>;
    outTransactions: Array<any>;
}

export class TransaccionesView extends Component<IPropsTransaccioneView,{}>{
    constructor(props: IPropsTransaccioneView) {
        super(props);
    }

    render(){
        return <div>
            <h2>Transacciones</h2>
            {this.props.outTransactions.map((documents: any) => {
                return <h4>{documents.get('input')? documents.get('input'): 'createAcount'} ->> {documents.get('value')} ->> {documents.get('output')}</h4>
            })}
            {this.props.inputTransactions.map((documents: any) =>{
                return <h4>{documents.get('input')} ->> {documents.get('value')} ->> {documents.get('output')}</h4>
            })}
        </div>
    }
}
