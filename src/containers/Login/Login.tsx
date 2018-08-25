import * as React from "react";
import { Component } from 'react'
import {store} from "../../stores/Store";
import {LoginForm} from "../../components/LoginForm/LoginForm";
import {RouteProps, withRouter} from "react-router";
import './Login.css';




export class Login extends Component<RouteProps,{}> {

    render() {
    if(store.isAuthenticated) {
        return <div className={'divLogin'}>
            <AuthButton/>
        </div>
    }

        return <div className={'divLogin'}>
            <LoginForm from={this.props.location.state} title={'Logeate Papu'}/>
        </div>

    }
    
}

const AuthButton = withRouter(({ history }) => (
    store.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
            store.signout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
));