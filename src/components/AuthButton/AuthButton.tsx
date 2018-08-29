import * as React from "react";
import './AuthButton.css'
import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {store} from "../stores/Store";
import {Link} from "react-router-dom";

interface IAuthButtonProps {
    userName: string;
    isAuthenticated: boolean
}


export class AuthButton extends Component<IAuthButtonProps & RouteComponentProps<{}>, {}>  {


    render(){
        const { history } = this.props;
        const { userName } = this.props;

        if(this.props.isAuthenticated){
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

export const SignOutBox = withRouter(AuthButton);