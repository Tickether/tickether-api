import express from 'express';
import { forgotPassword, login, register, updatePassword } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register );

router.post('/login', login);

router.post('/reset', forgotPassword)

router.put('/resetPassword/:id/:token', updatePassword)



export default router