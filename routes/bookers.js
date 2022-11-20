import express from 'express';
import { deleteBooker, getBooker, getBookerBookings, getBookers, getToken, getTokenReset, updateBooker } from '../controllers/booker.js';
import { verifyAdmin, verifyBookee, verifyBooker, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/checkauthy', verifyToken, (req, res, next) => {
    res.send('Hello, you are logged in')
})

router.get('/checkbooker/:id', verifyBooker, (req, res, next) => {
    res.send('Hello, you are logged in')
})

router.get('/checkbookee/:id', verifyBookee, (req, res, next) => {
    res.send('Hello, you are logged in')
})

router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send('Hello, you are logged in')
})

//UPDATE
router.put('/:id', verifyBooker, updateBooker);

//DELETE
router.delete('/:id', verifyBooker, deleteBooker);

//GET
router.get('/:id', verifyBooker, getBooker);

router.get('/:id/verify/:token', getToken);

router.get('/:id/resetpassword/:token', getTokenReset);

//GET ALL
router.get('/', verifyAdmin, getBookers);

router.get('/bookings/:id', getBookerBookings);

//router.get('/bookees/:id', getBookerBookee)

export default router