import express from 'express';
import { forgotPassword, login, register } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register );

router.post('/login', login);

router.put('/reset', forgotPassword)

export default router