import React from 'react';

import TorNodeTable from '../tables/tornodetable';
import TorNodeFormDialog from '../misc/tornodeformdialog';

import WebsiteTable from '../tables/websitetable';
import WebsiteFormDialog from '../misc/websiteformdialog';

import RedirectionTable from '../tables/redirectiontable';
import RedirectionFormDialog from '../misc/redirectionformdialog';

/*
Need to implement a type of form here with which to enter information about each node.
As the user selects each row the form will update with the new information.
This is exactly like the behavior page without the blockly loading
all values should be stored directly in mongo without any trouble

Taksk:
Make tables for websites and redirection


*/

class WebServiceTab extends React.Component {
    state = {
		project_id: this.props.projectID,
        torRowData: [],
        torDialogOpen: false,
        webRowData: [],
        webDialogOpen: false,
        redirRowData: [],
        redirDialogOpen: false
    };

    componentDidMount = () => {
        //fetch tor data from table
    }
    
    handleRowClick = (value) => {

    }
    
    addNewRow = (key) => {
        this.setState({ [key]: true });
    }

    removeRow = () => {
		//remove row later
    }
    
    handleDialogData = (data) => {
        if(data.success){
            let newData = [];
            newData = newData.concat(this.state[data.dataKey]);
            let newRow = data.data;
            newRow.id = newData.length;
            newData = newData.concat(newRow);

            this.setState({ [data.dataKey]: newData });
        }
        this.setState({ [data.dialogKey]: false });
    }

    render() {
        const { torRowData, torDialogOpen, webRowData, webDialogOpen, redirRowData, redirDialogOpen } = this.state;

        return(
            <div>
                <TorNodeTable 
                    data={torRowData} 
                    tableTitle="Tor Nodes" 
                    callback={(value) => this.handleRowClick(value)}
                    handleAddAction={() => this.addNewRow("torDialogOpen")}
                    handleDeleteAction={this.removeRow}
                />
                <TorNodeFormDialog open={torDialogOpen} parentCallback={(data) => this.handleDialogData(data)} />
                <div style={ { marginTop: 20 } } />
                <WebsiteTable 
                    data={webRowData} 
                    tableTitle="Web Services" 
                    callback={(value) => this.handleRowClick(value)}
                    handleAddAction={() => this.addNewRow("webDialogOpen")}
                    handleDeleteAction={this.removeRow}
                />
                <WebsiteFormDialog open={webDialogOpen} parentCallback={(data) => this.handleDialogData(data)} />
                <div style={ { marginTop: 20 } } />
                <RedirectionTable
                    data={redirRowData} 
                    tableTitle="Redirection Node" 
                    callback={(value) => this.handleRowClick(value)}
                    handleAddAction={() => this.addNewRow("redirDialogOpen")}
                    handleDeleteAction={this.removeRow}
                />
                <RedirectionFormDialog open={redirDialogOpen} parentCallback={(data) => this.handleDialogData(data)} />
            </div>
        );
    }
}

export default WebServiceTab;