import React from 'react';
import {Route} from 'react-router-dom';
import LoginPage from '../../pages/loginpage';
import 'whatwg-fetch';

class PrivateRoute extends React.Component {

    state = {
        authenticated: false,
        shouldRender: false
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
        .then(data => data.json())
        .then((res) => {
            if(res.user){
                this.setState({ 
                    authenticated: true,
                    shouldRender: true
                 });
            }
            else {
                this.setState({ 
                    authenticated: false,
                    shouldRender: true
                 });
            }
        });
    }
    
    render() {
        const { component: Component, ...rest } = this.props;
        const { authenticated, shouldRender } = this.state;
        if(shouldRender) {
            return (
                <Route {...rest} render={(props) => {
                    if(authenticated === true) {
                        return (
                            <Component {...props} onAuthFail={this.updateAuthenticated} />
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
        return (<div />);
    }
}

export default PrivateRoute;