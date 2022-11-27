import Book from "../models/Book.js";
import Bookee from "../models/Bookee.js";
import Booking from "../models/Booking.js";
import Withdrawal from "../models/Withdrawal.js";

export const createBook = async (req, res, next) => {
    const bookeeId = req.params.bookeeid;
    const newBook = new Book(req.body)

    try{
        const savedBook = await newBook.save();
        try {
            await Bookee.findByIdAndUpdate(bookeeId, {
                $push: { books: savedBook._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedBook)
    } catch(err) {
        next(err);
    }
};

export const updateBook = async (req, res, next) => {
    try{
        const updateBook = await Book.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updateBook);
    } catch(err) {
        next(err);
    }
}

export const deleteBook = async (req, res, next) => {
    const bookeeId = req.params.bookeeid;
    try{
        await Book.findByIdAndDelete(req.params.id);
        try {
            await Bookee.findByIdAndUpdate(bookeeId, {
                $pull: { books: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json('Book has been deleted');
    } catch(err) {
        next(err);
    }
}

export const getBook = async (req, res, next) => {
    try{
        const book = await Book.findById(
            req.params.id
        );
        res.status(200).json(book);
    } catch(err) {
        next(err);
    }
}

export const getBooks = async (req, res, next) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    } catch(err) {
        next(err);
    }
}

export const getBookBookings = async (req, res, next) =>{
    try{
        const book = await Book.findById(req.params.id)
        const list = await Promise.all(
            book.bookings.map(booking=>{
                return Booking.findById(booking);
            })
        );
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
}



export const getBookWithdrawals = async (req, res, next) =>{
    try{
        const book = await Book.findById(req.params.id)
        const list = await Promise.all(
            book.withdrawals.map(withdrawal=>{
                return Withdrawal.findById(withdrawal);
            })
        );
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
}

