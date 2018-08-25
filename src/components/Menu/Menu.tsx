import * as React from 'react';

import './Menu.css';
import {Link} from "react-router-dom";



export const Menu = ({}) => {
    return <nav className="MenuNav">
            <ul className="MenuUl">
                <li>
                    <Link to={'/'}>Login</Link>
                </li>
                <li>
                    <Link to={'/Registro'}>Registrar</Link>
                </li>
                <li>
                    <Link to={'/Home'}>Home-Protegido</Link>
                </li>
            </ul>
    </nav>
};