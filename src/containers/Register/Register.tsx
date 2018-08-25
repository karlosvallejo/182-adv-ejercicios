import * as React from "react";
import { Component } from 'react'
import {store} from "../../stores/Store";
import {RegisterForm} from "../../components/RegisterForm/RegisterForm";
import './Register.css';
export class Register extends Component<{},{}> {

    render() {
        return <div className={'registroDiv'}>
            <RegisterForm title={'Registrate Papu'}/>
        </div>
    }

}