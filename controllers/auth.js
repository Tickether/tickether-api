import Booker from '../models/Booker.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const booker_info = await Booker.findOne({email: req.body.email});
        if(booker_info)
            return res.status(200).json({
            success:false,
            message:'Booker already exist. Please login',
        })

        const newBooker = new Booker({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: hash
        })

        await newBooker.save()
        res.status(200).send('Booker has been created')
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