const express = require("express")
const router = express.Router()

// Pour acceder à la bas de donnée
const candidateController = require("../controllers/candidate.controller")

// pour la validation (champ requis pour la creation)
const {validateCandidate} = require("../middlewares/candidate.middleware")

// protection login
const auth = require("../middlewares/auth.middleware")



// Methode pour la creation d'un candidant
router.post("/create_candidate", auth, validateCandidate, candidateController.create)

// Methode pour récupérer tous les canditats
router.get("/get_all_candidate", auth, candidateController.getAll)

// Methode pour récupérer un seul candidat
router.get("/get_one_candidate/:id", auth, candidateController.getOne)


// Methode pour la mise à jour d'un candidats
router.put("/update_candidate/:id", auth,  validateCandidate,candidateController.update)

// Methode pour supprimer un candidat
router.delete("/delete_candidate/:id", auth, candidateController.remove)

module.exports = router