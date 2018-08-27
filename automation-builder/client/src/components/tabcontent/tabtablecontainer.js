import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import BehaviorTab from './behaviortab';
import NetworkTab from './networktab';
import WebServiceTab from './webservicetab';

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
		project_id: this.props.projectID,
		snackbarOpen: false,
		snackbarMessage: "",
		rowData: [],
		configData: [],
	}

	constructor(props){
		super(props);
		this.blocklyEditor = React.createRef();
	}

	handleChange = (event, v) => {
		this.setState({ value: v });
	};

	openSnackbar = (message) => {
		this.setState({ snackbarOpen: true, snackbarMessage: message });
	}

	handleSnackbarClose = () => {
		this.setState({ snackbarOpen: false });
	}

	render() {
		const { classes } = this.props;
		const { value, rowData, project_id, snackbarMessage, snackbarOpen } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="Behavior" />
						<Tab label="Network" disabled={true} />
						<Tab label="Web Services" disabled={false} />
						<Tab label="Project Settings" disabled={true} />
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer>
					<BehaviorTab projectID={project_id} snackbarCallback={(message) => this.openSnackbar(message)}/>
				</TabContainer>}
				{value === 1 && <TabContainer>
					<NetworkTab />
				</TabContainer>}
				{value === 2 && <TabContainer>
					<WebServiceTab projectID={project_id} snackbarCallback={(message) => this.openSnackbar(message)}/>
				</TabContainer>}
				{value === 3 && <TabContainer>Page to display configuration settings for the project.</TabContainer>}
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					autoHideDuration={1000}
					transitionDuration={250}
					open={snackbarOpen}
					onClose={this.handleSnackbarClose}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">{snackbarMessage}</span>}
				/>
			</div>
		);
	}
}

TabTableContainer.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TabTableContainer);