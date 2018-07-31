import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    description: String,
},{ timestamps: true});

export default mongoose.model('Project', ProjectSchema, 'projects');