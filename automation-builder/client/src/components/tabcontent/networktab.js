import React from 'react';

import Grid from '@material-ui/core/Grid';

import BlocklyEditor from '../blocklycomponents/blocklyeditor';
import DeviceTable from '../tables/devicetable';
import VisEditor from '../misc/viseditor';

const gridstyle = {
	minWidth: 400,
	paddingLeft: 0,
	paddingTop: 0,
	paddingRight: 0,
	paddingBottom: 0,
};

class NetworkTab extends React.Component {

    state = {
        project_id: this.props.projectID,
		rowData: [],
		configData: [],
    };

    render() {
        const { rowData, configData } = this.state;
        return(
            <Grid container spacing={24} justify="flex-start" style={gridstyle}>
                <Grid item xs={12}>
                    <DeviceTable 
                        data={rowData} 
                        tableTitle="Device Configs" 
                        callback={(configID) => this.handleRowClick(configID)}
                        handleAddAction={this.addNewRow}
                        handleDeleteAction={this.removeRow}
                    />
                </Grid>
                <Grid item xs={6}>
                    <BlocklyEditor ref={this.blocklyEditor} configData={configData} />
                </Grid>
                <Grid item xs={6}>
                    <VisEditor />
                </Grid>
            </Grid>
        );
    }
}

export default NetworkTab;