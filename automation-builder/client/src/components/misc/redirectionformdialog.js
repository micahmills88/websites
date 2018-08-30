import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const dialogStyle = {
    marginTop: 10
}


class RedirectionFormDialog extends React.Component {
    state = {
        hostname: "",
        ipaddress: "",
    };

    domainFieldUpdate = (e) => {
        this.setState({ hostname: e.target.value });
    }

    addressFieldUpdate = (e) => {
        this.setState({ ipaddress: e.target.value });
    }

    updateParent = (created) => {
        this.props.parentCallback({
            success: created,
            dataKey: "redirRowData",
            dialogKey: "redirDialogOpen",
            data: {
                id: 0,
                hostname: this.state.hostname,
                ipaddress: this.state.ipaddress
            }
        })
    }

    render() {
        return(
            <Dialog
                open={this.props.open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Redirection Settings</DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="domain"
                        label="Domain"
                        placeholder="example1.domain.url.edu"
                        onChange={ this.domainFieldUpdate }
                    />
                    <div style={dialogStyle}/>
                    <TextField
                        margin="dense"
                        id="ipaddress"
                        label="IP Address"
                        placeholder="100.0.50.20"
                        onChange={ this.addressFieldUpdate }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.updateParent(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.updateParent(true)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default RedirectionFormDialog;