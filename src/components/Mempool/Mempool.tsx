import * as React from "react";
import { Component } from 'react'
import './Mempool.css';
import {observer} from "mobx-react";
import {store} from "../../stores/Store";
import {deleteTransaction} from "../../stores/FirestoreDB";


interface IPropsMempool {

}

@observer export class Mempool extends Component<IPropsMempool,{}>{
    constructor(props: IPropsMempool) {
        super(props);
    }

    onDeleteTransaction(id: string, e: React.MouseEvent<HTMLHeadingElement>){
        deleteTransaction(id);
    }

    render(){
        return <div>
            <h2>mempool</h2>
            <h3>User transactions</h3>
                {store.mempoolInputUserTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot) => {
                     return <h4 key={documents.id} onClick={(e) => this.onDeleteTransaction(documents.id,e)}>{documents.get('input')? documents.get('input'): 'createAcount'} ->> {documents.get('value')} ->> {documents.get('output')}</h4>
                })}
            <h3>others Transactions</h3>
            {store.mempoolTransactionsAll.map((documents: firebase.firestore.QueryDocumentSnapshot) => {
                return <h4 key={documents.id}>{documents.get('input')? documents.get('input'): 'createAcount'} ->> {documents.get('value')} ->> {documents.get('output')}</h4>
            })}
        </div>
    }
}