import mongoose from 'mongoose';


const schema = new mongoose.Schema({
	title: {type: String, required: true},
    banner: {type: String,required: true},
	views: {type: Number, required: false},
	status: {type: String,default: "processing",enum:['processing','complete']},
    likes: {type: Number, required: false},
    dislikes: {type: Number, required: false},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required: true},
    videsouce:{type: String,default: undefined}
},{timestamps: true});



export default mongoose.model('stream', schema);