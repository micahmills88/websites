import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import ConfigsTable from './configstable';
import BlocklyEditor from './blocklyeditor';

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 24 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	button: {
		marginTop: 25,
	},
});

class TabTableContainer extends React.Component {
	state = {
		value: 0,
		project_id: this.props.project_id,
		open: false,
		rowData: [],
		configData: [],
		workspaceDisabled: true
	}

	constructor(props){
		super(props);
		this.blocklyEditor = React.createRef();
	}

	handleChange = (event, v) => {
		this.setState({ value: v });
	};

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
						
						this.setState({ open: true, rowData, configData });
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

	handleClose = () => {
		this.setState({ open: false });
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
							id: rowData.length + 1, 
							long_id: res.newID, 
							name: postData.name, 
							vm: postData.machine, 
							user: postData.account.user, 
							count: postData.behaviors
						};
						rowData.push(newRow);

						let newConfig = {
							id: res.newID,
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

	render() {
		const { classes } = this.props;
		const { value, workspaceDisabled, rowData, configData } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="Behavior" />
						<Tab label="Network" />
						<Tab label="Web Services" />
						<Tab label="Project Settings" />
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer>
					<ConfigsTable 
						data={rowData} 
						tableTitle="Automation Configs" 
						callback={(configID) => this.handleRowClick(configID)}
						handleAddAction={this.addNewRow}
						handleDeleteAction={this.removeRow}
						/>
					<Button 
						disabled={workspaceDisabled} 
						className={classes.button} 
						variant="contained" 
						size="large" 
						color="secondary" 
						onClick={this.handleSaveButton} >
						Save Workspace
					</Button>
					<BlocklyEditor ref={this.blocklyEditor} configData={configData} project_id={this.state.project_id} />
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						autoHideDuration={1000}
						transitionDuration={250}
						open={this.state.open}
						onClose={this.handleClose}
						ContentProps={{
							'aria-describedby': 'message-id',
						}}
						message={<span id="message-id">Workspace Saved</span>}
					/>
				</TabContainer>}
				{value === 1 && <TabContainer>Item Two</TabContainer>}
				{value === 2 && <TabContainer>Item Three</TabContainer>}
				{value === 3 && <TabContainer>Item Three</TabContainer>}
			</div>
		);
	}
}

TabTableContainer.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TabTableContainer);