import express from 'express';
import { createBooking, deleteBooking, getBooking, getBookings, updateBooking } from '../controllers/booking.js';
import { verifyAdmin, verifyBooker } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:bookid/:bookerid/:bookeeid', createBooking);

//UPDATE
router.put('/:id', verifyBooker, updateBooking);

//DELETE
router.delete('/:id/:bookid/:bookerid/:bookeeid', verifyAdmin, deleteBooking);

//GET
router.get('/:id', getBooking);

//GET ALL
router.get('/', getBookings);

 
export default router