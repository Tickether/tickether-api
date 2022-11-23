import mongoose from "mongoose";
const { Schema } = mongoose;

const WithdrawalSchema = new mongoose.Schema({
    bookee: {
        type: Schema.ObjectId,
        ref: 'Bookee',
        required: true,
    },
    book: {
        type: Schema.ObjectId,
        ref: 'Booker',
        required: true,
    },
    txnHash: {
        type: String,
        required: true,
        unique: true
    },
    amount:{
        type: Number,
        required: true,
    },
    withdrawAt:{
        type: Date,
        default:Date.now(),
    }
});

export default mongoose.model('Withdrawal', WithdrawalSchema)