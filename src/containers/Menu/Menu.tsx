import * as React from 'react';

import './Menu.css';
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {store} from "../../stores/Store";
import {Component} from "react";
import {observer} from "mobx-react";
import {any} from "prop-types";



@observer export class Menu extends Component<{},{}>{



        render() {
            if(store.isAuthenticated) {


                return <nav className="MenuNav">
                    <ul className="MenuUl">
                        <li>
                            <ShowTheLocationWithRouter userName={store.userName}
                                                       isAuthenticated={store.isAuthenticated}/>
                        </li>
                        <li>
                            <Link to={'/Home'}>Home-Protegido</Link>
                        </li>
                    </ul>
                </nav>
            }

            return <nav className="MenuNav">
                <ul className="MenuUl">
                    <li>
                        <ShowTheLocationWithRouter userName={store.userName}
                                                   isAuthenticated={store.isAuthenticated}/>
                    </li>
                    <li>
                        <Link to={'/Registro'}>Registrar</Link>
                    </li>
                    <li>
                        <Link to={'/Home'}>Home-Protegido</Link>
                    </li>
                </ul>
            </nav>
        }

}





interface IAuthButtonProps extends RouteComponentProps<{}>{
    userName: string;
    isAuthenticated: boolean
}

class AuthButton extends Component<IAuthButtonProps,{}>  {

    constructor(props:IAuthButtonProps) {
        super(props);
    }


    render(){
        const { history } = this.props;
        const { userName } = this.props;

        if(this.props.isAuthenticated){
            console.log("entrooo");
            return <div className={'UserNameDiv'}>
                <p>{userName}</p>
                <button onClick={() => {
                    store.signout(() => history.push('/'))
                }}>Sign out</button>
            </div>
        }
        return  <Link to={'/'}>Sign In</Link>
    }

}

const ShowTheLocationWithRouter = withRouter(AuthButton);
