import * as React from "react";
import { Component } from 'react'
import {LoginForm} from "../../components/LoginForm/LoginForm";
import {Redirect, RouteProps} from "react-router";
import './Login.css';
import {store} from "../../stores/Store";




export class Login extends Component<RouteProps,{}> {

    render() {

        if(store.isAuthenticated) {
         return <Redirect to={'/Home'}/>
        }

        return <div className={'divLogin'}>
            <LoginForm from={this.props.location.state} title={'Logeate Papu'}/>
        </div>
    }
    
}