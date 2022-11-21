import Booker from '../models/Booker.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import Token from "../models/Token.js";
import { sendEmail } from "../utils/sendEmail.js";

const crypto = await import('node:crypto');

export const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const email_info = await Booker.findOne({email: req.body.email});
        const phone_info = await Booker.findOne({phone: req.body.phone});
        if(email_info) return next(createError(404, 'Email already exist. Please login!'));
        if(phone_info) return next(createError(404, 'Phone already in use. Enter another!'));

        const newBooker = new Booker({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            isBookee: req.body.isBookee
        })

        const booker = await newBooker.save()

        const token = await new Token({
            booker: booker._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save()

        if (!booker.isBookee) {
            let url = `${process.env.BASE_URL}/bookers/${booker._id}/verify/${token.token}`
            await sendEmail(booker.email, 'Verify Email', url)
        } else {
            let url = `${process.env.BASE_PERFORMERS_URL}/bookers/${booker._id}/verify/${token.token}`
            await sendEmail(booker.email, 'Verify Email', url)   
        }
        
        res.status(200).send('Email has been sent to you account. Please verify!')
    } catch(err){
        next(err)
    }
};

export const login = async (req, res, next) => {
    try{
        const booker = await Booker.findOne({email: req.body.email});
        if(!booker) return next(createError(404, 'email not found!'));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            booker.password
        );
        if(!isPasswordCorrect) 
        return next(createError(400, 'wrong password or email!'));

        if(!booker.verified) {
            let token = await Token.findOne({
                booker: booker._id
            })
            if(!token) {
                const token = await new Token({
                    booker: booker._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save()
                
                if (!booker.isBookee) {
                    let url = `${process.env.BASE_URL}/bookers/${booker._id}/verify/${token.token}`
                    await sendEmail(booker.email, 'Verify Email', url)
                } else {
                    let url = `${process.env.BASE_PERFORMERS_URL}/bookers/${booker._id}/verify/${token.token}`
                    await sendEmail(booker.email, 'Verify Email', url)   
                }
            }
            return res.status(400).send('Email has been sent to you account. Please verify!')
        }

        const token = jwt.sign({id:booker._id, isBookee: booker.isBookee, isAdmin: booker.isAdmin}, process.env.JWT);

        const {password, isBookee, isAdmin, ...otherDetails} = booker._doc;

        res
        .cookie('accessJWT', token, {
            httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isBookee, isAdmin });
        
    } catch(err){
        next(err);
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const booker = await Booker.findOne({email: req.body.email});
        if(booker){
            const token = await new Token({
                booker: booker._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save()
            if (!booker.isBookee) {
                let url = `${process.env.BASE_URL}/bookers/${booker._id}/verify/${token.token}`
                await sendEmail(booker.email, 'Reset Password', url)
            } else {
                let url = `${process.env.BASE_PERFORMERS_URL}/bookers/${booker._id}/resetpassword/${token.token}`
                await sendEmail(booker.email, 'Reset Password', url)   
            } 
    
            res.status(200).send('Reset link has been sent to you email. Please verify!')
        } else {
            return next(createError(404, 'Email not registered. Please sign up!'));
        } 
    } catch (error) {
        
    }
}

export const updatePassword = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const booker = await Booker.findOne({id: req.params.id});
        const token = await Token.findOne({
            booker: req.params.id,
            token: req.params.token
        })
        
        if(!booker) return next(createError(404, 'Invalid booker link!'));
        if(!token) return next(createError(404, 'Invalid token link!'));
        
        await Booker.findByIdAndUpdate(
            req.params.id, 
            {password: hash}, 
            {new: true}
        );
        
        await token.remove()

        res.status(200).send('Password successfully reset. Please Login!')
        
    } catch (error) {
        
    }
}

