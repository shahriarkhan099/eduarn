
import express from "express";

const router = express.Router();

import {requireSignin} from '../middlewares/index'

import {signup, signin, signout, currentUser, sendTestEmail, } from '../controllers/auth';

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/current-user', requireSignin, currentUser);
router.get('/send-email', sendTestEmail);

module.exports = router;

