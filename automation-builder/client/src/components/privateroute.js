import React from 'react';
import {Route} from 'react-router-dom';
import LoginPage from '../pages/loginpage';
import 'whatwg-fetch';

class PrivateRoute extends React.Component {

    state = {
        authenticated: false
    }

    updateAuthenticated = (auth) =>
    {
        this.setState({authenticated: auth})
    }

    componentWillMount = () =>
    {
        fetch('/api/user', { // login
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'same-origin'
        })
        .then((res) => {
            this.updateAuthenticated(res.status === 200);
        });
    }
    
    render() {
        const { component: Component, ...rest } = this.props;
        const { authenticated } = this.state;
        return (
            <Route {...rest} render={(props) => {
                if(authenticated === true) {
                    return (
                        <Component {...props} />
                    );
                }
                else {
                    return (
                        <LoginPage onLogin={this.updateAuthenticated} />
                    );
                }
                
            }} />
        );
    }
}

export default PrivateRoute;