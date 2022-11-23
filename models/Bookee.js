import mongoose from "mongoose";
const { Schema } = mongoose;

const BookeeSchema = new mongoose.Schema({
    booker: {
        type: Schema.ObjectId,
        ref: 'Booker',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    cover: {
        type: [String]
    },
    genre: {
        type: String,
    },
    label: {
        type: String,
    },
    region: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    wallet: {
        type: String,
    },
    twitter: {
        type: String,
    },
    instagram: {
        type: String,
    },
    books: {
        type: [String],
    },
    bookings: {
        type: [String],
    },
    withdrawals: {
        type: [String],
    },
    featureBookings: {
        type: [Date]
    },
    showBookings: {
        type: [Date],
        unique: true
    },
    featured: {
        type: Boolean,
        default: false,
    },
    cheapestPrice: {
        type: Number,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
}, { timestamps: true } );

export default mongoose.model('Bookee', BookeeSchema)