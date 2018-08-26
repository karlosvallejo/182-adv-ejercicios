import * as React from "react";
import { Component } from 'react'
import {RegisterForm} from "../../components/RegisterForm/RegisterForm";
import './Register.css';
import {observer} from "mobx-react";
import {store} from "../../stores/Store";
import {Redirect} from "react-router";


@observer export class Register extends Component<{},{}> {

    render() {
        if(store.isAuthenticated) {
            return <Redirect to={'/'}/>
        }
        return <div className={'registroDiv'}>
            <RegisterForm title={'Registrate Papu'}/>
        </div>
    }

}