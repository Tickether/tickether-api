
import Book from "../models/Book.js";
import Bookee from "../models/Bookee.js";
import Booker from "../models/Booker.js";
import Booking from "../models/Booking.js";

export const createBooking = async (req, res, next) => {
    const bookId = req.params.bookid;
    const bookerId = req.params.bookerid;
    const bookeeId = req.params.bookeeid;
    const newBooking = new Booking(req.body)

    try{
        const savedBooking = await newBooking.save();
        try {
            await Book.findByIdAndUpdate(bookId, {
                $push: { bookings: savedBooking._id },
            });
            await Booker.findByIdAndUpdate(bookerId, {
                $push: { bookings: savedBooking._id },
            });
            await Bookee.findByIdAndUpdate(bookeeId, {
                $push: { bookings: savedBooking._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedBooking)
    } catch(err) {
        next(err);
    }
};

export const updateBooking = async (req, res, next) => {
    try{
        const updateBooking = await Booking.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updateBooking);
    } catch(err) {
        next(err);
    }
}

export const deleteBooking = async (req, res, next) => {
    const bookId = req.params.bookid;
    const bookerId = req.params.bookerid;
    const bookeeId = req.params.bookeeid;
    try{
        await Booking.findByIdAndDelete(req.params.id);
        try {
            await Book.findByIdAndUpdate(bookId, {
                $pull: { bookings: req.params.id },
            });
            await Booker.findByIdAndUpdate(bookerId, {
                $pull: { bookings: req.params.id },
            });
            await Bookee.findByIdAndUpdate(bookeeId, {
                $pull: { bookings: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json('Booking has been deleted');
    } catch(err) {
        next(err);
    }
}

export const getBooking = async (req, res, next) => {
    try{
        const booking = await Booking.findById(
            req.params.id
        );
        res.status(200).json(booking);
    } catch(err) {
        next(err);
    }
}

export const getBookings = async (req, res, next) => {
    try{
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch(err) {
        next(err);
    }
}