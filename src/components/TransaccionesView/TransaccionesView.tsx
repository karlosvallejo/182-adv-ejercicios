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
        return <div className={'generalDivTransactions'}>

            <div className={'transactionWrapper'}>
            <h2>Input Transactions</h2>
                <div className={'titlesDiv'}>
                    <h3 className={'titles'}>Sender</h3>
                    <h3 className={'titles'}>Amount</h3>
                    <h3 className={'titles'}>Receiver</h3>
                </div>
            <div className={'inputTransactionsDiv'}>

            <div className={'inDiv'}>

                {store.outTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                    return <h4 key={documents.id} className={index % 2 === 0? 'pairTag': 'NoPairTag'}>{documents.get('input')? documents.get('input'): 'createAcount'}</h4>
                })}
            </div>

            <div className={'valueDiv'}>

                {store.outTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                    return <h4 key={documents.id} className={index % 2 === 0? 'pairTag': 'NoPairTag'}>{documents.get('value')}</h4>
                })}
            </div>

            <div className={'outDiv'}>

            {store.outTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                return <h4 key={documents.id} className={index % 2 === 0? 'pairTag': 'NoPairTag'}>{documents.get('output')}</h4>
            })}
            </div>
            </div>
            </div>

            <div className={'transactionWrapper'}>
            <h2>Output Transactions</h2>
                <div className={'titlesDiv'}>
                    <h3 className={'titles'}>Sender</h3>
                    <h3 className={'titles'}>Amount</h3>
                    <h3 className={'titles'}>Receiver</h3>
                </div>
            <div className={'inputTransactionsDiv'}>
                <div className={'inDiv'}>
                    {store.inputTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                        return <h4 key={documents.id} className={index % 2 === 0? 'pairTag': 'NoPairTag'}>{documents.get('input')}</h4>
                    })}
                </div>

                <div className={'valueDiv'}>
                    {store.inputTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                        return <h4 key={documents.id} className={index % 2 === 0? 'pairTag': 'NoPairTag'}>{documents.get('value')}</h4>
                    })}
                </div>

                <div className={'outDiv'}>
                    {store.inputTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                        return <h4 key={documents.id} className={index % 2 === 0? 'pairTag': 'NoPairTag'}>{documents.get('output')}</h4>
                    })}
                </div>
            </div>
            </div>

        </div>
    }
}
