import express from 'express';
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/book.js';
import { verifyAdmin, verifyBookee } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:bookeeid', createBook);

//UPDATE
router.put('/:id', verifyBookee, updateBook);

//DELETE
router.delete('/:id/:bookeeid', verifyBookee, deleteBook);

//GET
router.get('/:id', getBook);

//GET ALL
router.get('/', getBooks);

export default router