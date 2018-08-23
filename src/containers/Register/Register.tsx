import * as React from "react";
import { Component } from 'react'
import {store} from "../../stores/Store";
import {RegisterForm} from "../../components/RegisterForm/RegisterForm";
export class Register extends Component<{},{}> {

    render() {
        return <div>
            <RegisterForm title={'Registrate Papu'}/>
        </div>
    }

}