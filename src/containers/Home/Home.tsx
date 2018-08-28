import * as React from "react";
import { Component } from 'react'
import {store} from "../../stores/Store";
import './Home.css';
import {TransaccionesView} from "../../components/TransaccionesView/TransaccionesView";
import {TransaccionesForm} from "../../components/TransaccionesForm/TransaccionesForm";
import {Mempool} from "../../components/Mempool/Mempool";
import {observer} from "mobx-react";


@observer export class Home extends Component<{},{}> {

     constructor(props: any){
         super(props);
     }

    render() {

        return <div className={'divHome'}>
            <h3>{store.balance}</h3>
            <TransaccionesView/>
            <TransaccionesForm/>
            <Mempool/>
        </div>
    }

}