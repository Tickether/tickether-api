import express from 'express';
import { createWithdrawal } from '../controllers/withdrawal.js';

const router = express.Router();


router.post('/:bookid/:bookeeid', createWithdrawal );


export default router