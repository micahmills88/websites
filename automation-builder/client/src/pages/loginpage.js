import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import 'whatwg-fetch';

const gridstyle = {
  minWidth: 400,
  paddingLeft: 25,
  paddingTop: 25,
  paddingRight: 25,
  paddingBottom: 25,
};

class LoginPage extends React.Component {

    componentDidMount = () => {
        
    }

    usernameFieldUpdate = (e) => {
        this.setState({ username: e.target.value });
    };

    passwordFieldUpdate = (e) => {
        this.setState({ password: e.target.value });
    };

    handleLogin = () => {
        fetch('/api/login', { // login
            method: "POST",
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            headers: {"Content-Type": "application/json"},
            credentials: 'same-origin'
        })
        .then((res) => {
            this.props.onLogin(res.status === 200);
        });
    };

    handleEnterKey = (e) => {
        if(e.keyCode === 13){
            this.handleLogin();
        }
    }

    render = () => {
        return (
            <div>
            <Grid container spacing={24} justify="center" style={gridstyle}>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Username"
                                placeholder="sid@domain.local"
                                fullWidth
                                onChange={ this.usernameFieldUpdate }
                                onKeyDown={ this.handleEnterKey }
                            />
                            <TextField
                                margin="dense"
                                id="desc"
                                label="Password"
                                type="password"
                                placeholder="domain password"
                                fullWidth
                                onChange={ this.passwordFieldUpdate }
                                onKeyDown={ this.handleEnterKey }
                            />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={this.handleLogin} color="primary">
                                Login
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            </ div>
        );
    };
}

export default LoginPage;