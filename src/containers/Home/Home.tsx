import * as React from "react";
import { Component } from 'react'
import './Home.css';

export class Home extends Component<{},{}> {

    render() {
        return <div className={'divHome'}>
            <h3>esto no se deberia ver sin logearse papu </h3>
        </div>
    }

}