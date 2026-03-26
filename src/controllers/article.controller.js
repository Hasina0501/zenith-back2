const articleService = require("../services/article.service")
const asyncHandler = require("../utils/asyncHandler")

// Fonction pour la création d'un nouvel article
const create = asyncHandler(async (req, res) => {
  const article = await articleService.createArticle(req.body)
  res.status(201).json(article)
})

// Pour récupérer tous les articles
const getAll = asyncHandler(async (req, res) => {
  const articles = await articleService.getAllArticle()
  res.json(articles)
})

// Pour récupérer un article avec son ID
const getOne = asyncHandler(async (req, res) => {
  const article = await articleService.getArticleId(req.params.id)

  if (!article) return res.status(404).json({ message: "Article introuvable" })
  res.json(article)
})

// Pour la mise à jour d'un article
const update = asyncHandler(async (req, res) => {
  const article = await articleService.updateArticle(
    req.params.id,
    req.body
  )
  res.json(article)
})

// Pour supprimer un article
const remove = asyncHandler(async (req, res) => {
  await articleService.deleteArticle(req.params.id)
  res.json({ message: "Article supprimé avec succès" })
})

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}
