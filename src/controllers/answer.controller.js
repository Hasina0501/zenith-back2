const answerService = require("../services/answer.service")
const asyncHandler = require("../utils/asyncHandler")

// Fonction pour la création d'une nouvelle réponse
const create = asyncHandler(async (req, res) => {
  const answer = await answerService.createAnswer(req.body)
  res.status(201).json(answer)
})

// Pour récupérer toutes les réponses
const getAll = asyncHandler(async (req, res) => {
  const answers = await answerService.getAllAnswer()
  res.json(answers)
})

// Pour récupérer une réponse avec son ID
const getOne = asyncHandler(async (req, res) => {
  const answer = await answerService.getAnswerId(req.params.id)

  if (!answer) return res.status(404).json({ message: "Réponse introuvable" })
  res.json(answer)
})

// Pour la mise à jour d'une réponse
const update = asyncHandler(async (req, res) => {
  const answer = await answerService.updateAnswer(
    req.params.id,
    req.body
  )
  res.json(answer)
})

// Pour supprimer une réponse
const remove = asyncHandler(async (req, res) => {
  await answerService.deleteAnswer(req.params.id)
  res.json({ message: "Réponse supprimée avec succès" })
})

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}
