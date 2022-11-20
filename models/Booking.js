import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
    booker: {
        type: Schema.ObjectId,
        ref: 'Booker',
        required: true
    },
    bookee: {
        type: Schema.ObjectId,
        ref: 'Bookee',
        required: true
    },
    book: {
        type: Schema.ObjectId,
        ref: 'Book',
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true,
        unique: true
    },
    checkIn: {
        type: Boolean,
        default: false
    },
    checkOut: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    offBook: {
        type: Boolean,
        default: false
    },
    txnId: {
        type: String
    },
    rfndId: {
        type: String
    }
}, { timestamps: true } );

export default mongoose.model('Booking', BookingSchema)