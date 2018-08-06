import Blockly from 'node-blockly/browser';

//===============================================================================================================================
Blockly.Blocks['check_process_name'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Check for process:")
            .appendField(new Blockly.FieldTextInput("svchost.exe"), "process_name");
        this.appendDummyInput()
            .appendField("Store result in Variable:")
            .appendField(new Blockly.FieldTextInput("Var_A"), "variable");
        this.appendDummyInput()
            .appendField("Behavior(s):");
        this.appendStatementInput("behaviors")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['check_process_name'] = function(block) {
    var type_name = `"type":"processCheck"`;
    var text_process_name = `"process":"${block.getFieldValue('process_name')}"`;
    var text_variable = `"variable":"${block.getFieldValue('variable')}"`;
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors').trim();
    var behavior_array = statements_behaviors.slice(0,-1);
    var behavior_dict = {};
    behavior_array.map((value, index) => {
        behavior_dict[index.toString()] = value;
    });
    var behavior_json = `"behaviors":{${behavior_dict}}`;
    
    return `{${text_variable},${type_name},${text_process_name},${behavior_json}}`;
};

//===============================================================================================================================
Blockly.Blocks['check_process_module'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Check for module:")
            .appendField(new Blockly.FieldTextInput("malware.dll"), "module_name");
        this.appendDummyInput()
            .appendField("in process:")
            .appendField(new Blockly.FieldTextInput("svchost.exe"), "process_name");
        this.appendDummyInput()
            .appendField("Store result in Variable:")
            .appendField(new Blockly.FieldTextInput("Var_A"), "variable");
        this.appendDummyInput()
            .appendField("Behavior(s):");
        this.appendStatementInput("behaviors")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['check_process_module'] = function(block) {
    var text_module_name = `"module":"${block.getFieldValue('module_name')}"`;
    var type_name = `"type":"processModuleCheck"`;
    var text_process_name = `"process":"${block.getFieldValue('process_name')}"`;
    var text_variable = `"variable":"${block.getFieldValue('variable')}"`;
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors').trim();
    var behavior_array = statements_behaviors.slice(0,-1);
    var behavior_dict = {};
    behavior_array.map((value, index) => {
        behavior_dict[index.toString()] = value;
    });
    var behavior_json = `"behaviors":{${behavior_dict}}`;
    
    return `{${text_variable},${type_name},${text_process_name},${text_module_name},${behavior_json}}`;
};

//===============================================================================================================================
Blockly.Blocks['control_sleep'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Sleep for")
            .appendField(new Blockly.FieldNumber(30), "time_value")
            .appendField(new Blockly.FieldDropdown([["seconds","seconds"], ["minutes","minutes"], ["hours","hours"]]), "time_units");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['control_sleep'] = function(block) {
    var number_time_value = `"value":"${block.getFieldValue('time_value')}"`;
    var dropdown_time_units = `"units":"${block.getFieldValue('time_units')}"`;
    var type_name = `"type":"controlSleep"`;
    return `{${type_name},${dropdown_time_units},${number_time_value}`;
};

//===============================================================================================================================
Blockly.Blocks['control_repeat_time'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Repeat every")
            .appendField(new Blockly.FieldNumber(30), "time_value")
            .appendField(new Blockly.FieldDropdown([["seconds","seconds"], ["minutes","minutes"], ["hours","hours"]]), "time_units");
        this.appendDummyInput()
            .appendField("Behavior(s):");
        this.appendStatementInput("behaviors")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['control_repeat_time'] = function(block) {
    var number_time_value = `"value":"${block.getFieldValue('time_value')}"`;
    var dropdown_time_units = `"units":"${block.getFieldValue('time_units')}"`;  
    var type_name = `"type":"controlRepeatTimer"`;
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors').trim();
    var behavior_array = statements_behaviors.slice(0,-1);
    var behavior_dict = {};
    behavior_array.map((value, index) => {
        behavior_dict[index.toString()] = value;
    });
    var behavior_json = `"behaviors":{${behavior_dict}}`;

    return `{${type_name},${dropdown_time_units},${number_time_value},${behavior_json}}`;
};

//===============================================================================================================================
Blockly.Blocks['control_repeat_random'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Repeat in random order and interval");
        this.appendDummyInput()
            .appendField("Behavior(s):");
        this.appendStatementInput("behaviors")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['control_repeat_random'] = function(block) {  
    var type_name = `"type":"controlRepeatRandom"`;
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors').trim();
    var behavior_array = statements_behaviors.slice(0,-1);
    var behavior_dict = {};
    behavior_array.map((value, index) => {
        behavior_dict[index.toString()] = value;
    });
    var behavior_json = `"behaviors":{${behavior_dict}}`;

    return `{${type_name},${behavior_json}}`;
};

//===============================================================================================================================
Blockly.Blocks['behavior_execute_command'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Execute command:")
            .appendField(new Blockly.FieldTextInput("dir c:\\users\\admin"), "command");
        this.appendDummyInput()
            .appendField("Shell:")
            .appendField(new Blockly.FieldDropdown([["cmd.exe","cmd"], ["PowerShell","powershell"], ["Run ","run"]]), "shell");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(110);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['behavior_execute_command'] = function(block) {
    var type_name = `"type":"execCommand"`;
    var text_command = `"command":"${block.getFieldValue('command')}"`;
    var dropdown_shell = `"shell":"${block.getFieldValue('shell')}"`;
    return `{${type_name},${dropdown_shell},${text_command}}`;
};

//===============================================================================================================================
Blockly.Blocks['behavior_send_email'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Send webmail:");
        this.appendDummyInput()
            .appendField("Website URL:")
            .appendField(new Blockly.FieldTextInput("http://mail.webmail.com/mail"), "site_url");
        this.appendDummyInput()
            .appendField("User:")
            .appendField(new Blockly.FieldTextInput("bob"), "site_username")
            .appendField("Password:")
            .appendField(new Blockly.FieldTextInput("abc123"), "site_password");
        this.appendDummyInput()
            .appendField("-------------------------");
        this.appendDummyInput()
            .appendField("Email To:")
            .appendField(new Blockly.FieldTextInput("person@othermail.com"), "email_to");
        this.appendDummyInput()
            .appendField("Subject:")
            .appendField(new Blockly.FieldTextInput("subject goes here"), "email_subject");
        this.appendDummyInput()
            .appendField("Body:");
        this.appendStatementInput("body")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(110);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['behavior_send_email'] = function(block) {
    var type_name = `"type":"emailSend"`;
    var text_site_url = `"sUrl":"${block.getFieldValue('site_url')}"`;
    var text_site_username = `"sUser":"${block.getFieldValue('site_username')}"`;
    var text_site_password = `"sPassword":"${block.getFieldValue('site_password')}"`;
    var text_email_to = `"sEmailTo":"${block.getFieldValue('email_to')}"`;
    var text_email_subject = `"sSubject":"${block.getFieldValue('email_subject')}"`;
    var statements_body = `"sBody": ${Blockly.JavaScript.statementToCode(block, 'body')}`; //may need to add newline chars
    
    return `{${type_name},${text_site_url},${text_site_username},${text_site_password},${text_email_to},${text_email_subject},${statements_body}}`;
};

//===============================================================================================================================
Blockly.Blocks['behavior_create_document'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Create Document:");
        this.appendDummyInput()
            .appendField("Text Editor Path:")
            .appendField(new Blockly.FieldTextInput("c:\\windows\\system32\\notepad.exe"), "editor_path");
        this.appendDummyInput()
            .appendField("Save File Name:")
            .appendField(new Blockly.FieldTextInput("c:\\users\\admin\\desktop\\malware.txt"), "file_path");
        this.appendDummyInput()
            .appendField("Text:");
        this.appendStatementInput("text")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(110);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['behavior_create_document'] = function(block) {
    var type_name = `"type":"docProduction"`;
    var mode_name = `"mode":"create"`; //future edit, append, etc...
    var text_editor_path = `"editorPath":"${block.getFieldValue('editor_path')}"`;
    var text_file_path = `"savePath":"${block.getFieldValue('file_path')}"`;
    var statements_text = `"text":"${Blockly.JavaScript.statementToCode(block, 'text')}"`;
    
    return `{${type_name},${mode_name},${text_editor_path},${text_file_path},${statements_text}}`;
};

//===============================================================================================================================
Blockly.Blocks['behavior_text_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Text:")
            .appendField(new Blockly.FieldTextInput("Type your text here."), "text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(345);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['behavior_text_block'] = function(block) {
    var text_text = block.getFieldValue('text');
    
    return text_text;
};

//===============================================================================================================================
Blockly.Blocks['behavior_variable_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get text from variable:")
            .appendField(new Blockly.FieldTextInput("Var_A"), "variable");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(345);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['behavior_variable_text'] = function(block) {
    var text_variable = block.getFieldValue('variable');
    
    return `{{${text_variable}}}`;
};

//===============================================================================================================================
Blockly.Blocks['check_netstat_connection'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Check netstat:");
        this.appendDummyInput()
            .appendField("Local IP:")
            .appendField(new Blockly.FieldTextInput("10.0.0.15"), "local_ip")
            .appendField("Local Port:")
            .appendField(new Blockly.FieldNumber(80, 0, 65535), "local_port");
        this.appendDummyInput()
            .appendField("Remote IP:")
            .appendField(new Blockly.FieldTextInput("100.20.5.4"), "remote_ip")
            .appendField("Remote Port")
            .appendField(new Blockly.FieldNumber(1234, 0, 65535), "remote_port");
        this.appendDummyInput()
            .appendField("Store result in Variable:")
            .appendField(new Blockly.FieldTextInput("Var_A"), "variable");
        this.appendDummyInput()
            .appendField("Behavior(s):");
        this.appendStatementInput("behaviors")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['check_netstat_connection'] = function(block) {
    var type_name = `"type":"networkCheck"`;
    //need protocol selector for now hardcode
    var protocol_type = `"proto":"tcp"`;
    var text_local_ip = `"localIP":"${block.getFieldValue('local_ip')}"`;
    var number_local_port = `"localPort":"${block.getFieldValue('local_port')}"`;
    var text_remote_ip = `"remoteIP":"${block.getFieldValue('remote_ip')}"`;
    var number_remote_port = `"remotePort":"${block.getFieldValue('remote_port')}"`;
    var protocol_state = `"STATE":"ESTABLISHED"`;
    var text_variable = block.getFieldValue('variable');
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors').trim();
    var behavior_array = statements_behaviors.slice(0,-1);
    var behavior_dict = {};
    behavior_array.map((value, index) => {
        behavior_dict[index.toString()] = value;
    });
    var behavior_json = `"behaviors":{${behavior_dict}}`;
    
    return `{${text_variable},${type_name},${protocol_type},${text_local_ip},${number_local_port},${text_remote_ip},${number_remote_port},${protocol_state},${behavior_json}}`;
};

//===============================================================================================================================
//===============================================================================================================================
//===============================================================================================================================
Blockly.Blocks['automation_config'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Automation Configuration:")
            .appendField(new Blockly.FieldTextInput("Config Name"), "config_name");
        this.appendDummyInput()
            .appendField("Virtual Machine:")
            .appendField(new Blockly.FieldTextInput("workstation.network.local"), "vm_name");
        this.appendDummyInput()
            .appendField("User:")
            .appendField(new Blockly.FieldTextInput("administrator"), "user_name")
            .appendField("Password:")
            .appendField(new Blockly.FieldTextInput("password"), "password");
        this.appendDummyInput()
            .appendField("Behavior(s):");
        this.appendStatementInput("behaviors")
            .setCheck("behavior")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setDeletable(false);
    }
};

Blockly.JavaScript['automation_config'] = function(block) {
    var name_var = `"name":"${block.getFieldValue('config_name')}"`;
    var machine_var = `"machine":${block.getFieldValue('vm_name')}`;
    var account_var = `"account":{"user":"${block.getFieldValue('user_name')}","password":"${block.getFieldValue('password')}"}`;
    var behaviors_count = `"behaviors":${block.getChildren().length}`

    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors').trim();
    var behavior_array = statements_behaviors.slice(0,-1);
    var behavior_dict = {};
    behavior_array.map((value, index) => {
        behavior_dict[index.toString()] = value;
    });
    var behavior_json = `"behavior_json":{${behavior_dict}}`;

    return `{${name_var},${machine_var},${account_var},${behaviors_count},${behavior_json}}`;
};

//===============================================================================================================================
const ToolBox = (blocks) => {
    var categoryXML = blocks.map((block) => {
        var blockXML = block.items.map((item) => {
            return '<block type="' + item + '"/>'
        })
        .join("");
        return '<category name="' + block.category + '">' + blockXML + '</category>';
    })
    .join("");

    return `<xml>${categoryXML}</xml>`;
};

export default ToolBox;