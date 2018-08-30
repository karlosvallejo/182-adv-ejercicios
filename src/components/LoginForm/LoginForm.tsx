import * as React from 'react';

import './LoginForm.css';
import {store} from "../../stores/Store";
import {Component} from "react";
import {Redirect} from "react-router";
import {Location} from "history";
import {FormGeneral} from "../FormGeneral/FormGeneral";
import {observer} from "mobx-react";

interface ILoginFormProps {
    from: Location["state"];
}


@observer export class LoginForm extends Component<ILoginFormProps, {}>{

    constructor(props: ILoginFormProps) {
        super(props);
    }

    login = (userName: string, password: string): void => {
        store.authenticate(userName, password).then((data: string) =>{
            store.mempoolTransactions();
            store.checkForBalance();
            store.saveLocalStorage();
        }).catch((error: string) => {
            alert(error);
        })
    };

    render() {

    const { from } = this.props.from|| { from: { pathname: '/' } };

    if (store.isAuthenticated === true) {
            return <Redirect to={from} />
    }

    return <FormGeneral title={'LOG IN'} buttonText={'ENTER TO THE BLOCKCHAIN'} createAccount={true} callbackAction={this.login}/>
    }
}