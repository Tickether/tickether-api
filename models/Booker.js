import mongoose from "mongoose";
const { Schema } = mongoose;

const BookerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    bookee: {
        type: [String]
    },
    bookings: {
        type: [String]
    },
    isBookee: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true } );

export default mongoose.model('Booker', BookerSchema)