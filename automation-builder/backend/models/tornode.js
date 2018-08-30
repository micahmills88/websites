import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Automation Config Schema
const TorNodeSchema = new Schema({
    type: String,
    bridge: Boolean,
    exit: Boolean,
    nick: String,
    hostname: String,
    ip: String,
    rate: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
},{ timestamps: true});

export default mongoose.model('TorNode', TorNodeSchema, 'tor_nodes');
