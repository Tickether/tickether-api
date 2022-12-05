import express from 'express';
import { createUpgradedToken, getUpgradedTokens, updateUpgradedToken } from '../controllers/upgradedToken.js';


const router = express.Router();

//CREATE
router.post('/', createUpgradedToken);

//UPDATE
router.put('/:id', updateUpgradedToken);

//GET ALL
router.get('/', getUpgradedTokens);


export default router