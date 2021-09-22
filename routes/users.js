const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const {
  getUserId,
} = require('../controllers/users');

router.get('/users/me', auth, getUserId);

module.exports = router;
