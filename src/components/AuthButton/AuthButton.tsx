import * as React from "react";
import './AuthButton.css'
import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Link} from "react-router-dom";
import {store} from "../../stores/Store";

interface IAuthButtonProps {
    userName: string;
    isAuthenticated: boolean
}


export class AuthButton extends Component<IAuthButtonProps & RouteComponentProps<{}>, {}>  {


    render(){
        const { history } = this.props;
        const { userName } = this.props;

        if(this.props.isAuthenticated){
            return  <div className={'signOutButton'} onClick={() => {  store.signout(() => history.push('/')) }}><div/> <p>{userName}</p></div>
        }
        return  <Link to={'/'}>Sign In</Link>
    }

}

export const SignOutBox = withRouter(AuthButton);