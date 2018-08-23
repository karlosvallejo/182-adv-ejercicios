import * as React from 'react';
import { observer } from 'mobx-react';
import { store } from '../../stores/Store';
import './Root.css';

import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {Menu} from "../../components/Menu/Menu";

interface IRootProps{}

@observer export class Root extends React.Component<IRootProps> {

    render(){
        return <div className="RootDiv">
            <Menu/>
            <Login/>
        </div>
    }
}























