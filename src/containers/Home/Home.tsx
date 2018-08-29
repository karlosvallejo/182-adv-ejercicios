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
            <div className={'panelOne'}>
            <div className={'balanceDiv'}>
            <h3>{store.balance}</h3>
            <h5>Balance</h5>
            </div>
            <TransaccionesView/>
            </div>

            <div className={'panelTwoThreeWrapper'}>
            <div className={'panelTwo'}>
            <TransaccionesForm/>
            </div>
            <div className={'panelThree'}>
            <Mempool/>
            </div>
            </div>

        </div>
    }

}