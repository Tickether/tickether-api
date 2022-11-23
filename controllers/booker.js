//import Bookee from "../models/Bookee.js";
import Booker from "../models/Booker.js";
import Booking from "../models/Booking.js";
import Token from "../models/Token.js";

export const updateBooker = async (req, res, next) => {
    try{
        const updateBooker = await Booker.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updateBooker);
    } catch(err) {
        next(err);
    }
}

export const deleteBooker = async (req, res, next) => {
    try{
        await Booker.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json('Booker has been deleted');
    } catch(err) {
        next(err);
    }
}

export const getToken = async (req, res, next) => {
    try{
        const booker = await Booker.findOne({
            _id: req.params.id
        });
        if (!booker) return res.status(400).send({message: 'Invalid Link'})

        const token = await Token.findOne({
            booker: booker._id,
            token: req.params.token
        })
        if (!token) return res.status(400).send({message: 'Invalid Link'})

        await booker.updateOne({
            verified: true
        })
        await token.remove()

        res.status(200).send({message: 'Email verified successfully'});
    } catch(err) {
        next(err);
    }
}

export const getTokenReset = async (req, res, next) => {
    try{
        const booker = await Booker.findOne({
            _id: req.params.id
        });
        if (!booker) return res.status(400).send({message: 'Invalid Link'})

        const token = await Token.findOne({
            booker: booker._id,
            token: req.params.token
        })
        if (!token) return res.status(400).send({message: 'Invalid Link'})

        res.status(200).send({message: 'You can now reset your password!'});
    } catch(err) {
        next(err);
    }
}

export const getBooker = async (req, res, next) => {
    try{
        const booker = await Booker.findById(
            req.params.id
        );
        res.status(200).json(booker);
    } catch(err) {
        next(err);
    }
}

export const getBookers = async (req, res, next) => {
    try{
        const bookers = await Booker.find();
        res.status(200).json(bookers);
    } catch(err) {
        next(err);
    }
}

export const getBookerBookings = async (req, res, next) =>{
    try{
        const booker = await Booker.findById(req.params.id)
        const list = await Promise.all(
            booker.bookings.map(booking=>{
                return Booking.findById(booking);
            })
        );
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
}
