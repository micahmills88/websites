import React from 'react';
import 'whatwg-fetch';
import Blockly from 'node-blockly/browser';

import ToolBox from '../components/toolbox'

class BlocklyEditor extends React.Component {
    state = {
        workspace: null,
        config_id: "",
        project_id: this.props.project_id,
      };


    loadConfig = (configID) => {
        var config = this.props.configData.find((element) => {
            return element.id === configID;
        });
        var xml = Blockly.Xml.textToDom(decodeURI(config.xml));
        this.state.workspace.clear();
        Blockly.Xml.domToWorkspace(xml, this.state.workspace);
        this.setState({ config_id: configID });
    };

    eventHandler = (event) => {
        //blockly events fire here
    };

    getUpdatedConfig = () => {
        //here we read the workspace and build a new automation config json for the database
        var code = Blockly.JavaScript.workspaceToCode(this.state.workspace);
        console.log(code);
        var json = JSON.parse(code);
        

        //also read the xml and save in the database
        var xml = Blockly.Xml.workspaceToDom(this.state.workspace, true);        
        var xml_text = encodeURI(Blockly.Xml.domToText(xml));
        //console.log(xml_text);

        return {
            id: this.state.config_id,
            name: json.name,
            machine: json.machine,
            account: json.account,
            behaviors: json.behaviors_count,
            project: this.state.project_id,
            json: code,
            xml: xml_text,
        };
    };

    componentDidMount() {

        var blocks = [
            
            //{ category: 'Config', items: ['automation_config'] },
            { category: 'Behaviors', 
                items: [
                    'behavior_execute_command', 
                    'behavior_send_email', 
                    'behavior_create_document'
                ] 
            },
            { category: 'Reactive',
                items: [
                    'check_process_name',
                    'check_process_module',
                    'check_netstat_connection',
                    'behavior_text_block',
                    'behavior_variable_text'
                ]
            },
            {category: 'Controls',
                items: [
                    'control_sleep',
                    'control_repeat_time',
                    'control_repeat_random'
                ]
            }
        ];
        var app = Blockly.inject(this.blocklyDiv, 
            {
                toolbox: ToolBox(blocks), 
                trashcan: true, 
                horizontalLayout: false, 
                sounds: false,
                grid: {
                    spacing: 20,
                    length: 1,
                    colour: '#ccc',
                    snap: true,
                },
            });
        app.addChangeListener(this.eventHandler);
        this.setState({ workspace: app });
    };

    render = () => {
        return (
            <div className="editor" style={{ marginTop: 5 }}>
                <div id="blocklyContainer">
                    <div id="blocklyDiv" ref={(d) => { this.blocklyDiv = d }}></div>
                </div>
            </div>
        );
    };
}

export default BlocklyEditor;