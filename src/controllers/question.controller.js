const questionService = require("../services/question.service")
const asyncHandler = require("../utils/asyncHandler")

// Fonction pour la création d'une nouvelle question
const create = asyncHandler(async (req, res) => {
  const question = await questionService.createQuestion(req.body)
  res.status(201).json(question)
})

// Pour récupérer toutes les questions
const getAll = asyncHandler(async (req, res) => {
  const questions = await questionService.getAllQuestion()
  res.json(questions)
})

// Pour récupérer une question avec son ID
const getOne = asyncHandler(async (req, res) => {
  const question = await questionService.getQuestionId(req.params.id)

  if (!question) return res.status(404).json({ message: "Question introuvable" })
  res.json(question)
})

// Pour la mise à jour d'une question
const update = asyncHandler(async (req, res) => {
  const question = await questionService.updateQuestion(
    req.params.id,
    req.body
  )
  res.json(question)
})

// Pour supprimer une question
const remove = asyncHandler(async (req, res) => {
  await questionService.deleteQuestion(req.params.id)
  res.json({ message: "Question supprimée avec succès" })
})

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}
