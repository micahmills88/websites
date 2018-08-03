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
    var text_process_name = block.getFieldValue('process_name');
    var text_variable = block.getFieldValue('variable');
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var text_module_name = block.getFieldValue('module_name');
    var text_process_name = block.getFieldValue('process_name');
    var text_variable = block.getFieldValue('variable');
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var number_time_value = block.getFieldValue('time_value');
    var dropdown_time_units = block.getFieldValue('time_units');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var number_time_value = block.getFieldValue('time_value');
    var dropdown_time_units = block.getFieldValue('time_units');
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var text_command = block.getFieldValue('command');
    var dropdown_shell = block.getFieldValue('shell');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var text_site_url = block.getFieldValue('site_url');
    var text_site_username = block.getFieldValue('site_username');
    var text_site_password = block.getFieldValue('site_password');
    var text_email_to = block.getFieldValue('email_to');
    var text_email_subject = block.getFieldValue('email_subject');
    var statements_body = Blockly.JavaScript.statementToCode(block, 'body');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var text_editor_path = block.getFieldValue('editor_path');
    var text_file_path = block.getFieldValue('file_path');
    var statements_text = Blockly.JavaScript.statementToCode(block, 'text');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    var text_local_ip = block.getFieldValue('local_ip');
    var number_local_port = block.getFieldValue('local_port');
    var text_remote_ip = block.getFieldValue('remote_ip');
    var number_remote_port = block.getFieldValue('remote_port');
    var text_variable = block.getFieldValue('variable');
    var statements_behaviors = Blockly.JavaScript.statementToCode(block, 'behaviors');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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
    }
};

Blockly.JavaScript['automation_config'] = function(block) {
    var name_var = `"name":"${block.getFieldValue('config_name')}"`;
    var machine_var = `"machine":${block.getFieldValue('vm_name')}`;
    var account_var = `"account":{"user":"${block.getFieldValue('user_name')}","password":"${block.getFieldValue('password')}"}`;
    var behavior_json = Blockly.JavaScript.statementToCode(block, 'behaviors').trim();
    behavior_json = `"behavior_json":[${behavior_json.slice(0,-1)}]`;
    var behaviors_var = `"behaviors":${block.getChildren().length}`

    return `{${name_var},${machine_var},${account_var},${behaviors_var},${behavior_json}}`;
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