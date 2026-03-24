const express = require(`express`)
const router = express.Router()
const {create, get, update, delField} = require("../controllers/formField.controller")
const  auth = require("../middlewares/auth.middleware")

router.get("/get_field", get)
router.post("/create_field", auth, create)
router.post("/update_field/:id", auth, update)
router.delete("/delete_field/:id", auth, delField)

module.exports = router