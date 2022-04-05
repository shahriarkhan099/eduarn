
const express = require('express');

const router = express.Router();

import {signup} from '../controllers/auth';

router.post('/signup', signup);

module.exports = router;
