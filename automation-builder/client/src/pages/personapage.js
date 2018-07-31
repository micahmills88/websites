import React from 'react';
import Blockly from 'node-blockly/browser';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import EnhancedTable from '../components/enhancedtable';
import ToolBox from '../components/toolbox'

class BlocklyEditor extends React.Component {

    componentDidMount() {

        var blocks = ['automation_config', 'machine_new', 'machine_select', 'persona_new', 'persona_select'];
        Blockly.inject(this.blocklyDiv, {toolbox: ToolBox(blocks), trashcan: true});
    }

    render = () => {
        return (
            <div className="editor" style={{height: 800}}>
                <div id="blocklyContainer">
                    <div id="blocklyDiv" ref={(d) => {this.blocklyDiv = d}}></div>
                </div>
            </div>
        );
    }
}

function PersonaPage() {
    return(
        <Grid container justify="center">
            <Grid item xs={8}>
                <EnhancedTable tableTitle="Personas"/>
            </Grid>
            <Grid item xs={8}>
                <Paper>
                    <BlocklyEditor />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default PersonaPage;
