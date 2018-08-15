import React from 'react';
import 'whatwg-fetch';

import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TabTableContainer from '../components/tabtablecontainer';

const gridstyle = {
        minWidth: 400,
        paddingLeft: 25,
        paddingTop: 25,
        paddingRight: 25,
        paddingBottom: 25,
};

class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project_id: this.props.match.params.project_id,
            project_name: " ",
            project_description: " "
        }
    }

    componentWillMount (){
        //query project info
        fetch('/api/projectid', {
            method: "POST",
            body: JSON.stringify({id: this.state.project_id}),
            headers: {"Content-Type": "application/json"},
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then((res) => {
            if(!res.success) this.setState({error: res.error});
            else {
                this.setState({
                    project_name:  res.data.name,
                    project_description: res.data.description
                });
            };
        });
    }

    render () {
        return(
            <div>
                <Grid container spacing={24} justify="flex-start" style={gridstyle}>
                    <Grid item xs={12}>
                        <Typography variant="display2" gutterBottom>
                            Project : {this.state.project_name}
                        </Typography>
                        <Typography variant="subheading" gutterBottom>
                            Description: {this.state.project_description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TabTableContainer project_id={this.state.project_id} onAuthFail={this.props.onAuthFail }/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ProjectPage;