import * as React from "react";
import { Component } from 'react'
import {store} from "../../stores/Store";
import {LoginForm} from "../../components/LoginForm/LoginForm";
export class Login extends Component<{},{}> {

    render() {
        return <div>
            <LoginForm title={'Logeate Papu'}/>
        </div>
    }
    
}