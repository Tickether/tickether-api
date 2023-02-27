
import Book from "../models/Book.js";
import Bookee from "../models/Bookee.js";
import Withdrawal from "../models/Withdrawal.js";

export const createWithdrawal = async (req, res, next) => {
    const bookId = req.params.bookid;
    const bookeeId = req.params.bookeeid;
    const newWithdrawal = new Withdrawal(req.body)

    try{
        const savedWithdrawal = await newWithdrawal.save();
        try {
            await Book.findByIdAndUpdate(bookId, {
                $push: { withdrawals: newWithdrawal._id },
            });
            await Bookee.findByIdAndUpdate(bookeeId, {
                $push: { withdrawals: newWithdrawal._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedWithdrawal)
    } catch(err) {
        next(err);
    }
};

/*

export const getWithdrawal = async (req, res, next) => {
    try{
        const withdrawal = await Withdrawal.findById(
            req.params.id
        );
        res.status(200).json(withdrawal);
    } catch(err) {
        next(err);
    }
}

export const getWithdrawals = async (req, res, next) => {
    try{
        const withdrawals = await Withdrawal.find();
        res.status(200).json(withdrawals);
    } catch(err) {
        next(err);
    }
}

*/