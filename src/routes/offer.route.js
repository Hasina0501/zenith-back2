const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const offerController = require("../controllers/offer.controller")

// Pour la validation des champs requis pour la création
const validateOffer = require("../middlewares/offer.middleware")

// Méthode pour la création d'une offre
router.post("/create_offer", validateOffer, offerController.create)

// Méthode pour récupérer toutes les offres
router.get("/get_all_offer", offerController.getAll)

// Méthode pour récupérer une seule offre
router.get("/get_one_offer/:id", offerController.getOne)

// Méthode pour la mise à jour d'une offre
router.put("/update_offer/:id", validateOffer, offerController.update)

// Méthode pour supprimer une offre
router.delete("/delete_offer/:id", offerController.remove)

module.exports = router
