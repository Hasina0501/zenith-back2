const express = require('express')
const router = express.Router()
const auth = require("../middlewares/auth.middleware")
const FormController = require('../controllers/form.controller')


router.get("/get_form",FormController.getForm)
router.get("/form_active", auth, FormController.getActive)
router.post("/create_form", auth, FormController.create)
router.put("/update_form/:id", auth, FormController.update)
router.delete("/delete_form/:id", auth, FormController.delForm)


module.exports = router