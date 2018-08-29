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



        return <div className={'generalDivMempool'}>
            <h2>Mempool</h2>



            <div className={'memTransactionsContainer'}>
                        {store.mempoolInputUserTransactions.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                            const rowInput = <h4>{documents.get('input')}</h4>;
                            const rowValue = <h4>{documents.get('value')}</h4>;
                            const rowOputput =<h4>{documents.get('output')}</h4>;
                            return <div onClick={(e) =>(this.onDeleteTransaction(documents.id, e))} key={documents.id} className={index % 2 === 0? 'pairTag mempoolLogiDiv userMempoolPair estasletrasblancas': 'NoPairTag mempoolLogiDiv userMempoolNoPair estasletrasblancas'}>{rowInput}{rowValue}{rowOputput}</div>
                        })}

                        {store.mempoolTransactionsAll.map((documents: firebase.firestore.QueryDocumentSnapshot, index: number) => {
                            const rowInput = <h4>{documents.get('input')? documents.get('input'): 'createAcount'}</h4>;
                            const rowValue = <h4>{documents.get('value')}</h4>;
                            const rowOputput =<h4>{documents.get('output')}</h4>;
                            return <div key={documents.id} className={index % 2 === 0? 'pairTag mempoolLogiDiv estasletrasnegras': 'NoPairTag mempoolLogiDiv estasletrasnegras'}>{rowInput}{rowValue}{rowOputput}</div>
                        })}
            </div>




             </div>
    }
}