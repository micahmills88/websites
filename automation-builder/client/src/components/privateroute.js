import React from 'react';
import {Route} from 'react-router-dom';
import LoginPage from '../pages/loginpage';


class PrivateRoute extends React.Component {

    state = {
        authenticated: false
    }

    updateAuthenticated = (auth) =>
    {
        this.setState({authenticated: auth})
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