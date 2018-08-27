import React from 'react';

import NodeTable from '../tables/nodetable';

/*
Need to implement a type of form here with which to enter information about each node.
As the user selects each row the form will update with the new information.
This is exactly like the behavior page without the blockly loading
all values should be stored directly in mongo without any trouble

1. Design the new form and implement it below the table
2. handle add new row to add a row to the database and populate the data in the form
3. handle form save to update the database and the table

4. add a /api/webservice/:project to the server

*/

class WebServiceTab extends React.Component {
    state = {
		project_id: this.props.projectID,
		rowData: [],
    };
    
    handleRowClick = (configID) => {

    }
    
    addNewRow = () => {

    }

    removeRow = () => {
		//remove row later
	}

    render() {
        const { rowData } = this.state;

        return(
            <div>
                <NodeTable 
                    data={rowData} 
                    tableTitle="Tor Nodes" 
                    callback={(configID) => this.handleRowClick(configID)}
                    handleAddAction={this.addNewRow}
                    handleDeleteAction={this.removeRow}
                />
            </div>
        );
    }
}

export default WebServiceTab;