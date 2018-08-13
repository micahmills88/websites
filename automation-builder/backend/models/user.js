import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_name: String
},{ timestamps: true});

export default mongoose.model('User', UserSchema, 'user');