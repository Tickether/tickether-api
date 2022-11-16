import mongoose from "mongoose";
const { Schema } = mongoose;

const TokenSchema = new mongoose.Schema({
    booker: {
        type: Schema.ObjectId,
        ref: 'Booker',
        required: true,
        unique: true
    },
    token: {
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        default:Date.now(),
        expires:3600 // 60mins
    }
});

export default mongoose.model('Token', TokenSchema)