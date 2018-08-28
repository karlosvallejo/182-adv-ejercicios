import * as React from "react";
import { Component } from 'react'
import './TransaccionesView.css';
import {observer} from "mobx-react";
import {store} from "../../stores/Store";

interface IPropsTransaccioneView {
}

@observer export class TransaccionesView extends Component<IPropsTransaccioneView,{}>{
    constructor(props: IPropsTransaccioneView) {
        super(props);
    }

    render(){
        return <div>
            <h2>Transacciones</h2>
            {store.outTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot) => {
                return <h4 key={documents.id}>{documents.get('input')? documents.get('input'): 'createAcount'} ->> {documents.get('value')} ->> {documents.get('output')}</h4>
            })}
            {store.inputTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot) =>{
                return <h4 key={documents.id}>{documents.get('input')} ->> {documents.get('value')} ->> {documents.get('output')}</h4>
            })}
        </div>
    }
}
