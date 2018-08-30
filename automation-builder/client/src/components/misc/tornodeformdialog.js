import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';

const dialogStyle = {
    marginTop: 10
}


class TorNodeFormDialog extends React.Component {
    state = {
        domain: "",
        nickname: "",
        ipaddress: "",
        nodeType: "authority",
        bridgeNode: false,
        exitNode: false,
        rate: "dialup"
    };

    domainFieldUpdate = (e) => {
        this.setState({ domain: e.target.value });
    }

    nickFieldUpdate = (e) => {
        this.setState({ nickname: e.target.value });
    }

    addressFieldUpdate = (e) => {
        this.setState({ ipaddress: e.target.value });
    }

    typeSelectUpdate = (e) => {
        this.setState({ nodeType: e.target.value });
    }

    bridgeCheckboxUpdate = (e) => {
        this.setState({ bridgeNode: e.target.checked });
    }

    exitCheckboxUpdate = (e) => {
        this.setState({ exitNode: e.target.checked });
    }

    rateSelectUpdate = (e) => {
        this.setState({ rate: e.target.value });
    }

    updateParent = (created) => {
        this.props.parentCallback({
            success: created,
            dataKey: "torRowData",
            dialogKey: "torDialogOpen",
            data: {
                id: 0,
                domain: this.state.domain,
                nickname: this.state.nickname,
                ipaddress: this.state.ipaddress,
                nodeType: this.state.nodeType,
                bridgeNode: this.state.bridgeNode.toString(),
                exitNode: this.state.exitNode.toString(),
                rate: this.state.rate
            }
        })
    }

    render() {
        return(
            <Dialog
                open={this.props.open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Tor Node Settings</DialogTitle>
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
                        id="nickname"
                        label="Nickname"
                        placeholder="example1"
                        onChange={ this.nickFieldUpdate }
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
                    <InputLabel htmlFor="select-nodetype">Node Type:</InputLabel>
                    <Select
                        id="select-nodetype"
                        value={this.state.nodeType}
                        onChange={this.typeSelectUpdate}
                    >
                        <option value="authority">  Authority</option>
                        <option value="relay"    >  Relay</option>
                    </Select>
                    <div style={dialogStyle}/>
                    <InputLabel htmlFor="select-bridge">Bridge Node:</InputLabel>
                    <Checkbox
                        id="select-bridge"
                        checked={this.state.bridgeNode}
                        onChange={this.bridgeCheckboxUpdate}
                        color="primary"
                    />
                    <div style={dialogStyle}/>
                    <InputLabel htmlFor="select-exit">Exit Node:</InputLabel>
                    <Checkbox
                        id="select-exit"
                        checked={this.state.exitNode}
                        onChange={this.exitCheckboxUpdate}
                        color="primary"
                    />
                    <div style={dialogStyle}/>
                    <InputLabel htmlFor="select-nodetype">Rate:</InputLabel>
                    <Select
                        id="select-nodetype"
                        value={this.state.rate}
                        onChange={this.rateSelectUpdate}
                    >
                        <option value="dialup">  Dialup</option>
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

export default TorNodeFormDialog;