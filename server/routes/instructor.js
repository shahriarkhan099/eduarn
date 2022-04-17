
import express from "express";

const router = express.Router();

import {requireSignin} from '../middlewares/index'

import { makeInstructor, getAccountStatus } from '../controllers/instructor';

router.post('/make-instructor', requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);


module.exports = router;


