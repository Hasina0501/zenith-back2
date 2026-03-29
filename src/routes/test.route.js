const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const testController = require("../controllers/test.controller")

// Pour la validation des champs requis pour la création
const validateTest = require("../middlewares/test.middleware")

// Méthode pour la création d'un test
router.post("/create_test", validateTest, testController.create)

// Méthode pour récupérer tous les tests
router.get("/get_all_test", testController.getAll)

// Méthode pour récupérer un seul test
router.get("/get_one_test/:id", testController.getOne)

// Méthode pour la mise à jour d'un test
router.put("/update_test/:id", validateTest, testController.update)

// Méthode pour supprimer un test
router.delete("/delete_test/:id", testController.remove)

// Méthodes pour le test d'un coup (Test + Questions + Réponses) 🤣🤣
router.post("/full", testController.createTestFullController)
router.get("/full/get_all", testController.getAllFullController)
router.get("/full/get_one/:id", testController.getOneFullController)
router.put("/full/update/:id", validateTest, testController.updateFullController)
router.delete("/full/delete/:id", testController.deleteFullController)

module.exports = router
