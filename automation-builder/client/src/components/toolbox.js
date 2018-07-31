import Blockly from 'node-blockly/browser';

//===============================================================================================================================
Blockly.Blocks['machine'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("VM Name:")
            .appendField(new Blockly.FieldTextInput("name of vm"), "vm_name");
        this.setInputsInline(true);
        this.setOutput(true, "machine");
        this.setColour(115);
    }
};

Blockly.JavaScript['machine'] = function(block) {
    return `"${block.getFieldValue('vm_name')}"`;
};
  
//===============================================================================================================================
Blockly.Blocks['persona'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Username:")
            .appendField(new Blockly.FieldTextInput("fmlast"), "username");
        this.appendDummyInput()
            .appendField("Password:")
            .appendField(new Blockly.FieldTextInput("abc123!!!"), "password");
        this.setInputsInline(false);
        this.setOutput(true, "persona");
        this.setColour(200);
    }
};

Blockly.JavaScript['persona'] = function(block) {
    return `{"user":"${block.getFieldValue('username')}","password":"${block.getFieldValue('password')}"}`;
};

//===============================================================================================================================
Blockly.Blocks['behavior_browse_web'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Browse Web Behavior");
        this.appendDummyInput()
            .appendField("URL:")
            .appendField(new Blockly.FieldTextInput("www.example.com"), "web_url");
        this.setPreviousStatement(true, ["behavior", "action_browse_web", "action_launch_program"]);
        this.setNextStatement(true, ["action_borwse_web", "action_launch_program"]);
        this.setColour(359);
    }
};

//===============================================================================================================================
Blockly.Blocks['behavior_launch_program'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Launch Program Behavior");
        this.appendDummyInput()
            .appendField("Path:")
            .appendField(new Blockly.FieldTextInput("c:\\windows\\system32\\calc.exe"), "program_path");
        this.setPreviousStatement(true, ["behavior", "action_browse_web", "action_launch_program"]);
        this.setNextStatement(true, ["action_browse_web", "action_launch_program"]);
        this.setColour(359);
    }
};

//===============================================================================================================================
Blockly.Blocks['behavior_webapp_webmail'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Web Mail");
        this.appendDummyInput()
            .appendField("Server Address:")
            .appendField(new Blockly.FieldTextInput("http://webmail.mail.org/mail"), "server_address");
        this.appendDummyInput()
            .appendField("Credentials:")
            .appendField("User")
            .appendField(new Blockly.FieldTextInput("billybob"), "username")
            .appendField("Password")
            .appendField(new Blockly.FieldTextInput("abc123"), "password");
        this.appendDummyInput()
            .appendField("Email(s):");
        this.appendStatementInput("emails")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
    }
};

//===============================================================================================================================
Blockly.Blocks['email_send_single'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Send Email To:")
            .appendField(new Blockly.FieldTextInput("user@webmail.org"), "email_to");
        this.appendDummyInput()
            .appendField("Subject:")
            .appendField(new Blockly.FieldTextInput("subject here"), "email_subject");
        this.appendDummyInput()
            .appendField("Body:")
            .appendField(new Blockly.FieldTextInput("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. In convallis. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Etiam dictum tincidunt diam."), "email_body");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(315);
    }
};

//===============================================================================================================================
Blockly.Blocks['reactive_process_name'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Monitor process list for:")
            .appendField(new Blockly.FieldTextInput("svchost.exe"), "process_name");
        this.appendDummyInput()
            .appendField("Execute behavior(s):");
        this.appendStatementInput("action")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(80);
    }
};

Blockly.JavaScript['reactive_process_name'] = function(block) {
    var header_text = `"kind":"monitor","monitor":"processCheck","mode":single"`;
    var text_process_name = block.getFieldValue('process_name');
    var statements_action = Blockly.JavaScript.statementToCode(block, 'action');

    return `{${header_text},},`;
};

//===============================================================================================================================
Blockly.Blocks['reactive_process_diff'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Whenever the process list changes");
        this.appendDummyInput()
            .appendField("Execute behavior(s):");
        this.appendStatementInput("action")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(80);
    }
};

//===============================================================================================================================
Blockly.Blocks['reactive_process_module'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Whenever the module:")
            .appendField(new Blockly.FieldTextInput("blah.dll"), "module_name");
        this.appendDummyInput()
            .appendField("is loaded into process:")
            .appendField(new Blockly.FieldTextInput("lsass.exe"), "process_name");
        this.appendDummyInput()
            .appendField("Execute behavior(s):");
        this.appendStatementInput("action")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(80);
    }
};

Blockly.JavaScript['reactive_process_module'] = function(block) {
    var text_module_name = block.getFieldValue('module_name');
    var text_process_name = block.getFieldValue('process_name');
    var statements_action = Blockly.JavaScript.statementToCode(block, 'action');

    var code = '...;\n';
    return code;
};

//===============================================================================================================================
Blockly.Blocks['automation_config'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Automation Configuration");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput("Config Name"), "config_name");
        this.appendValueInput("virtual_machine")
            .setCheck("machine")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Virtual Machine -");
        this.appendValueInput("user_account")
            .setCheck("persona")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("User Account - ");
        this.appendDummyInput()
            .appendField("Behaviors:");
        this.appendStatementInput("behaviors")
            .setCheck("behavior")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setColour(230);
        this.setDeletable(false);
    }
};

Blockly.JavaScript['automation_config'] = function(block) {
    var name_var = `"name":"${block.getFieldValue('config_name')}"`;
    var machine_var = `"machine":${Blockly.JavaScript.statementToCode(block, 'virtual_machine')}`;
    var account_var = `"account":${Blockly.JavaScript.statementToCode(block, 'user_account')}`;
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