const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const testController = require("../controllers/test.controller")

// Pour la validation des champs requis pour la création
const validateTest = require("../middlewares/test.middleware")

// protection login
const auth = require("../middlewares/auth.middleware")


// Méthode pour la création d'un test
router.post("/create_test", auth, validateTest, testController.create)

// Méthode pour récupérer tous les tests
router.get("/get_all_test", auth,testController.getAll)

// Méthode pour récupérer un seul test
router.get("/get_one_test/:id", testController.getOne)

// Méthode pour la mise à jour d'un test
router.put("/update_test/:id", auth, validateTest, testController.update)

// Méthode pour supprimer un test
router.delete("/delete_test/:id", auth, testController.remove)

// Methode pour le teste d'un coup 🤣🤣
router.post("/full", auth, testController.createTestFullController)

module.exports = router
