import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessJWT;
    if (!token) {
        return next(createError(401, 'You are not authenticated!'));
    }

    jwt.verify(token, process.env.JWT, (err, booker)=>{
        if(err) return next(createError(403, 'Token is not valid!'));
        req.booker = booker;
        next();
    });
};

export const verifyBooker = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.booker.id === req.params.id || req.booker.isBookee){
            next();
        } else {
            if (err) 
            return next(createError(403, 'You are not authorized!'));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.booker.isAdmin){
            next();
        } else {
            return next(createError(403, 'You are not authorized admin!'));
        }
    });
};


export const verifyBookee = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.booker.isBookee){
            next();
        } else { 
            return next(createError(403, 'You are not authorized bookee!'));
        }
    });
};