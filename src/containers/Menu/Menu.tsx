import * as React from 'react';

import './Menu.css';
import {Link} from "react-router-dom";
import {store} from "../../stores/Store";
import {Component} from "react";
import {observer} from "mobx-react";
import {SignOutBox} from "../../AuthButton/AuthButton";


@observer export class Menu extends Component<{},{}>{



        render() {
            if(store.isAuthenticated) {


                return <nav className="MenuNav">
                    <ul className="MenuUl">
                        <li>
                            <SignOutBox userName={store.userName}
                                                       isAuthenticated={store.isAuthenticated}/>
                        </li>
                    </ul>
                </nav>
            }

            return <nav className="MenuNav">
                <ul className="MenuUl">
                    <li>
                        <SignOutBox userName={store.userName}
                                                   isAuthenticated={store.isAuthenticated}/>
                    </li>
                    <li>
                        <Link to={'/Registro'}>Registrar</Link>
                    </li>
                    {/*
                    <li>
                       <Link to={'/Home'}>Home-Protegido</Link>
                    </li>
                    */}
                </ul>
            </nav>
        }

}






