import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
    bookee: {
        type: Schema.ObjectId,
        ref: 'Bookee',
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookType: {
        type: String,
        required: true,
        enum: ['Shows', 'Features']
    },
    description: {
        type: String,
        required: true
    },
    overBooked: {
        type: Boolean
    },
    contractAddress: {
        type: String,

    },
    bookFee: {
        type: Number,
        required: true 
    },
    bookings: {
        type: [String]
    },
}, { timestamps: true } );

export default mongoose.model('Book', BookSchema)