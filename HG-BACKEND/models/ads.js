import mongoose from 'mongoose';


const schema = new mongoose.Schema({
	title: {type: String, required: true},
    banner: {type: String,required: true},
	description: {type: String, required: false},
},{timestamps: true});



export default mongoose.model('ad', schema);