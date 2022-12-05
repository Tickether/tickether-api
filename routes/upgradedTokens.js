import express from 'express';
import {  createUpgradedToken, updateUpgradedToken, getUpgradedTokens } from '../controllers/bookee.js';

const router = express.Router();

//CREATE
router.post('/', createUpgradedToken);

//UPDATE
router.put('/:id', updateUpgradedToken);

//GET ALL
router.get('/', getUpgradedTokens);


export default router