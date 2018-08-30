import React from 'react';
import 'whatwg-fetch';

import Button from '@material-ui/core/Button';

import ConfigsTable from '../tables/configstable';
import BlocklyEditor from '../blocklycomponents/blocklyeditor';

const styles = {
    marginTop: 25
}

class BehaviorTab extends React.Component {

    state = {
		project_id: this.props.projectID,
		rowData: [],
		configData: [],
		workspaceDisabled: true
	};

	constructor(props){
		super(props);
		this.blocklyEditor = React.createRef();
	}

    componentWillMount() {
		fetch('/api/get_automation_configs', { //read all the configs for the project
			method: "POST",
			body: JSON.stringify({id: this.state.project_id}),
			headers: {"Content-Type": "application/json"},
			credentials: 'same-origin'
		})
		.then((res) => {
			if(res.status === 200)
      		{
				return res.json().then((json) => {
					if(!json.success) this.setState({error: json.error});
					else {
						let newData = [];
						let configData = [];
						json.data.forEach(element => { //build the row data for the table
							newData.push({
								id: newData.length, 
								long_id: element._id, 
								name: element.name, 
								vm: element.machine, 
								user: element.account.user, 
								count: element.behaviors
							});
							configData.push({ //build the config dictionary
								id: element._id,
								xml: element.xml
							});
						});
						this.setState({ rowData: newData, configData });
						//console.log(newData);
					}
				});
			} else {
				//reset private route state
				this.props.onAuthFail(false);
			}
		});
    }

    handleRowClick = (configID) => {
		this.setState({ workspaceDisabled: false });
		this.blocklyEditor.current.loadConfig(configID);
	}

    handleSaveButton = () => {
		var postData = this.blocklyEditor.current.getUpdatedConfig();

		fetch('/api/update_config', {
			method: "POST",
			body: JSON.stringify(postData),
			headers: {"Content-Type": "application/json"},
			credentials: 'same-origin'
		})
		.then((res) => {
			if(res.status === 200)
			{
				//console.log("got 200 from update...");
				return res.json().then((json) => {
					if(json.success)
					{
						//console.log("successful update also...")
						const { rowData, configData } = this.state;
						
						//update the row in the table
						var row = rowData.find(element => element.long_id === postData.id);
						row.name = postData.name;
						row.vm = postData.machine;
						row.user = postData.account.user;
						row.count = postData.behaviors;        

						var config = configData.find(element => element.id === postData.id);
						config.json = postData.json;
						config.xml = postData.xml;
						
						this.setState({ rowData, configData });
						this.props.snackbarCallback("Config Workspace Saved");
					}
				});
			}
			else 
			{
				//reset private route state
				this.props.onAuthFail(false);
			}
		});
	}

    addNewRow = () => {
		const { rowData, configData } = this.state;
		var postData = { //generate a default config
			name: "New Config",
			machine: "VM Name",
			account: {
				user:"User",
				password:"abc123",
			},
			project: this.state.project_id,
			behaviors: 0,
			json: "",
			xml:"%3Cxml%20xmlns=%22http://www.w3.org/1999/xhtml%22%3E%3Cblock%20type=%22automation_config%22%20x=%220%22%20y=%220%22%3E%3Cfield%20name=%22config_name%22%3ENew%20Config%3C/field%3E%3Cfield%20name=%22vm_name%22%3Eworkstation.network.local%3C/field%3E%3Cfield%20name=%22user_name%22%3Eadministrator%3C/field%3E%3Cfield%20name=%22password%22%3Epassword%3C/field%3E%3C/block%3E%3C/xml%3E",
		}

		fetch('/api/post_new_config', { //post the new config to the database
			method: "POST",
			body: JSON.stringify(postData),
			headers: {"Content-Type": "application/json"},
			credentials: 'same-origin'
		})
		.then((res) => {
			if(res.status === 200)
			{
				return res.json().then((json) => {
					if(json.success) {
						let newRow = { //add the new row to the table
							id: rowData.length, 
							long_id: json.newID, 
							name: postData.name, 
							vm: postData.machine, 
							user: postData.account.user, 
							count: postData.behaviors
						};
						rowData.push(newRow);

						let newConfig = {
							id: json.newID,
							xml: postData.xml
						};
						configData.push(newConfig);

						this.setState({ rowData, configData });
					}
				});
			}
			else 
			{
				//reset private route state
				this.props.onAuthFail(false);
			}
		});
	}
    
    removeRow = () => {
		//remove row later
	}

    render(){
        const { workspaceDisabled, rowData, configData } = this.state;
        
        return(
            <div>
                <ConfigsTable 
                    data={rowData} 
                    tableTitle="Automation Configs" 
                    callback={(configID) => this.handleRowClick(configID)}
                    handleAddAction={this.addNewRow}
                    handleDeleteAction={this.removeRow}
                    projectID={this.state.project_id}
                />
                <Button 
                    disabled={workspaceDisabled} 
                    variant="contained" 
                    style={styles}
                    size="large" 
                    color="secondary" 
                    onClick={this.handleSaveButton} 
                >
                    Save Workspace
                </Button>
                <BlocklyEditor ref={this.blocklyEditor} configData={configData} />
            </div>
        );
    }

}

export default BehaviorTab;