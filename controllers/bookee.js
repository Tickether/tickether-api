import Bookee from "../models/Bookee.js";
import Book from "../models/Book.js";
import Booker from "../models/Booker.js";
import Booking from "../models/Booking.js";
import Withdrawal from "../models/Withdrawal.js";

export const createBookee = async (req, res, next) => {
    const bookerId = req.params.bookerid;
    const newBookee = new Bookee(req.body);

    try{
        const savedBookee = await newBookee.save();
        try {
            await Booker.findByIdAndUpdate(bookerId, {
                $push: { bookee: savedBookee._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedBookee);
    } catch(err) {
        next(err);
    }
}

export const updateBookee = async (req, res, next) => {
    try{
        const updateBookee = await Bookee.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updateBookee);
    } catch(err) {
        next(err);
    }
}

export const deleteBookee = async (req, res, next) => {
    const bookerId = req.params.bookerid;
    try{
        await Bookee.findByIdAndDelete(
            req.params.id
        );
        try {
            await Booker.findByIdAndUpdate(bookerId, {
                $pull: { bookees: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json('Bookee has been deleted');
    } catch(err) {
        next(err);
    }
}

export const getBookee = async (req, res, next) => {
    try{
        const bookee = await Bookee.findById(
            req.params.id
        ); 
        res.status(200).json(bookee);
    } catch(err) {
        next(err);
    }
}

export const getBookees = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try{
        const bookees = await Bookee.find({...others, cheapestPrice: {$gt:min | 1, $lt:max || 1000000}}).limit(req.query.limit);
        res.status(200).json(bookees);
    } catch(err) {
        next(err);
    }
};

export const countByGenre = async (req, res, next) => {
    const genres = req.query.genres.split(',')
    try {
        const list = await Promise.all(genres.map(genre=>{
            return Bookee.countDocuments({genre:genre})
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByRegion = async (req, res, next) => {
    try {
        const africaCount = await Bookee.countDocuments({region:'Africa'})
        const euroCount = await Bookee.countDocuments({region:'Europe'})
        const naCount = await Bookee.countDocuments({region:'North America'})
        const asiaCount = await Bookee.countDocuments({region:'Asia'})
        const saCount = await Bookee.countDocuments({region:'South America'})
        const aussieCount = await Bookee.countDocuments({region:'Australia'})
        
        res.status(200).json([
            {region:'Africa', count:africaCount},
            {region:'Europe', count:euroCount},
            {region:'North America', count:naCount},
            {region:'Asia', count:asiaCount},
            {region:'South America', count:saCount},
            {region:'Australia', count:aussieCount},
        ]);
    } catch (err) {
        next(err); 
    }
}

export const getBookeeBooks = async (req, res, next) =>{
    try{
        const bookee = await Bookee.findById(req.params.id)
        const list = await Promise.all(
            bookee.books.map(book=>{
                return Book.findById(book);
            })
        );
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
};

export const getBookeeBookings = async (req, res, next) =>{
    try{
        const bookee = await Bookee.findById(req.params.id)
        const list = await Promise.all(
            bookee.bookings.map(booking=>{
                return Booking.findById(booking);
            })
        );
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
};



export const getBookeeWithdrawals = async (req, res, next) =>{
    try{
        const bookee = await Bookee.findById(req.params.id)
        const list = await Promise.all(
            bookee.withdrawals.map(withdrawal=>{
                return Withdrawal.findById(withdrawal);
            })
        );
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
}




/*
export const countByRegion = async (req, res, next) => {
    const regions = req.query.regions.split(',')
    try {
        const list = await Promise.all(regions.map(region=>{
            return Bookee.countDocuments({region:region})
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err); 
    }
}
*/