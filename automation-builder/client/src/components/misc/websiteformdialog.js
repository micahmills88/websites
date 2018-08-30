import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const dialogStyle = {
    marginTop: 10
}


class WebsiteFormDialog extends React.Component {
    state = {
        domain: "",
        ipaddress: "",
        webType: "twitter"
    };

    domainFieldUpdate = (e) => {
        this.setState({ domain: e.target.value });
    }

    addressFieldUpdate = (e) => {
        this.setState({ ipaddress: e.target.value });
    }

    typeSelectUpdate = (e) => {
        this.setState({ nodeType: e.target.value });
    }

    updateParent = (created) => {
        this.props.parentCallback({
            success: created,
            dataKey: "webRowData",
            dialogKey: "webDialogOpen",
            data: {
                id: 0,
                domain: this.state.domain,
                ipaddress: this.state.ipaddress,
                nodeType: this.state.webType
            }
        })
    }

    render() {
        return(
            <Dialog
                open={this.props.open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Website Settings</DialogTitle>
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
                    <div style={dialogStyle}/>
                    <InputLabel htmlFor="select-nodetype">Website Type :</InputLabel>
                    <Select
                        id="select-nodetype"
                        value={this.state.webType}
                        onChange={this.typeSelectUpdate}
                    >
                        <option value="twitter">Twitter</option>
                        <option value="upload">Free File Upload</option>
                        <option value="forum">Web Forum</option>
                        <option value="email">Webmail</option>
                    </Select>
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

export default WebsiteFormDialog;