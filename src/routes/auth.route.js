const express = require('express');
const loginController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router();

router.post('/login', loginController.login);
router.post('/logout',authMiddleware,  loginController.logOut);

module.exports = router