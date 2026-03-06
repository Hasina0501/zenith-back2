const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getUsers)
router.post('/createUser', userController.createUsers)
router.put("/updateUser/:id", userController.UpdateUsers)
router.delete("/deleteUser/:id", userController.deleteUsers)

module.exports = router