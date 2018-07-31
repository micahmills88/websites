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
        var json = JSON.parse(code);

        //also read the xml and save in the database
        var xml = Blockly.Xml.workspaceToDom(this.state.workspace, true);        
        var xml_text = encodeURI(Blockly.Xml.domToText(xml));

        return {
            id: this.state.config_id,
            name: json.name,
            machine: json.machine,
            account: json.account,
            behaviors: json.behaviors,
            project: this.state.project_id,
            json: encodeURI(json.behavior_json.toString()),
            xml: xml_text,
        };
    };

    componentDidMount() {

        var blocks = [
            
            //{ category: 'Config', items: ['automation_config'] },
            { category: 'VM', items: ['machine'] },
            { category: 'Account', items: ['persona'] },
            { category: 'Behaviors', 
                items: [
                    'behavior_browse_web', 
                    'behavior_launch_program', 
                    'behavior_webapp_webmail',
                    'email_send_single'
                ] 
            },
            { category: 'Events',
                items: [
                    'reactive_process_name',
                    'reactive_process_diff',
                    'reactive_process_module'
                ]
            },
            {category: 'Variables',
                items: [
                    'text',
                    'text_join'
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