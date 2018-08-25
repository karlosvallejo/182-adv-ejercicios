import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter, RouteProps, RouteComponentProps
} from "react-router-dom";
import { observer } from 'mobx-react';
import { store } from '../../stores/Store';
import './Root.css';

import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {Menu} from "../../components/Menu/Menu";
import {Home} from "../Home/Home";

interface IRootProps{}

@observer export class Root extends React.Component<IRootProps> {

    render(){
        return <div className="RootDiv">


            <Router>
                <div className={'divRouter'}>
                 <Menu/>
                <Route exact path="/" component={Login} />
                <Route exact path="/Registro" component={Register} />
                <PrivateRoute exact path="/Home" component={Home} />
                </div>
            </Router>
        </div>
    }
}



export const PrivateRoute = ({ component, ...rest }: RouteProps) => {

    if (!component) {
        throw Error("component is undefined");
    }

    const Component = component; // JSX Elements have to be uppercase.
    const render = (props: RouteComponentProps<any>): React.ReactNode => {
        if (store.isAuthenticated) {
            return <Component {...props} />;
        }
        return <Redirect to={{ pathname: '/',
            state: { from: props.location } }} />
    };

    return (<Route {...rest} render={render} />);
};























