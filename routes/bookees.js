import express from 'express';
import { countByGenre, countByRegion, createBookee, deleteBookee, getBookee, getBookeeBookings, getBookeeBooks, getBookees, getBookeeWithdrawals, updateBookee } from '../controllers/bookee.js';
import { verifyAdmin, verifyBookee, verifyBooker } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:bookerid', createBookee);

//UPDATE
router.put('/:id', updateBookee);

//DELETE
router.delete('/:id/:bookeeid', verifyBookee, deleteBookee);

//GET
router.get('/find/:id', getBookee);

//GET ALL
router.get('/', getBookees);

router.get('/countByGenre', countByGenre);

router.get('/countByRegion', countByRegion);

router.get('/books/:id', getBookeeBooks)

router.get('/bookings/:id', getBookeeBookings)

router.get('/withdrawals/:id', getBookeeWithdrawals)

export default router