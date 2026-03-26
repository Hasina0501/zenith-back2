const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const articleController = require("../controllers/article.controller")

// Pour la validation des champs requis pour la création
const validateArticle = require("../middlewares/article.middleware")

// Méthode pour la création d'un article
router.post("/create_article", validateArticle, articleController.create)

// Méthode pour récupérer tous les articles
router.get("/get_all_article", articleController.getAll)

// Méthode pour récupérer un seul article
router.get("/get_one_article/:id", articleController.getOne)

// Méthode pour la mise à jour d'un article
router.put("/update_article/:id", validateArticle, articleController.update)

// Méthode pour supprimer un article
router.delete("/delete_article/:id", articleController.remove)

module.exports = router
