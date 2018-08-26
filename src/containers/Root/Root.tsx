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
import {Menu} from "../Menu/Menu";
import {Home} from "../Home/Home";



@observer export class Root extends React.Component<{},{}> {

    render(){
        return <div className="RootDiv">


            <Router>
                <div className={'divRouter'}>
                 <Menu/>
                <Route exact path="/" component={Login} />
                <Route exact path="/Registro" component={Register} />
                <ProtectedRoute  {...{authenticationPath: '/'}}  exact={true} path='/Home' component={Home} />
                </div>
            </Router>
        </div>
    }
}


export interface ProtectedRouteProps extends RouteProps {
    authenticationPath: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (!store.isAuthenticated) {
            redirectPath = this.props.authenticationPath;
        }

        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{pathname: redirectPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}























