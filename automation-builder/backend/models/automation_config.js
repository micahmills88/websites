import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Automation Config Schema
const AutomationConfigSchema = new Schema({
    name: String,
    machine: String,
    account: {
        user: String,
        password: String
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    behaviors: Number,
    json: String,
    xml: String,
},{ timestamps: true});

export default mongoose.model('AutomationConfig', AutomationConfigSchema, 'automation_configs');
