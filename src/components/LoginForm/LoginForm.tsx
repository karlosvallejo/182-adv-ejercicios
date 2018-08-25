import * as React from 'react';

import './LoginForm.css';
import {store} from "../../stores/Store";
import {Component} from "react";
import {Redirect} from "react-router";
import {Location} from "history";

interface HeaderProps {
    title: string;
    from: Location["state"];
}

interface ILoginFormState{
    redirectToReferrer: boolean;
}

export class LoginForm extends Component<HeaderProps, ILoginFormState>{

    constructor(props: HeaderProps){
        super(props);
        this.state = {
            redirectToReferrer: false,
        };
    }

    login = (): void => {
        store.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    };

    render() {

        const { from } = this.props.from|| { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

    return <div className="LoginForm">
        <h1>{this.props.title}</h1>
        <div>
            <button onClick={this.login}>Log in</button>
        </div>
    </div>;
    }
}