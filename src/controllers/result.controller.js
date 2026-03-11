const resultService = require("../services/result.service")
const asyncHandler = require("../utils/asyncHandler")

// Fonction pour la soumission d'un test
const submit = asyncHandler(async (req, res) => {
  try {
    const { candidateId, testId, answers } = req.body
    
    const resultData = await resultService.submitTest(candidateId, testId, answers)
    
    res.status(201).json({
      message: "Test soumis avec succès",
      data: resultData
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Pour récupérer tous les résultats
const getAll = asyncHandler(async (req, res) => {
  const results = await resultService.getAllResult()
  res.json(results)
})

// Pour récupérer un résultat avec son ID
const getOne = asyncHandler(async (req, res) => {
  const result = await resultService.getResultId(req.params.id)

  if (!result) return res.status(404).json({ message: "Résultat introuvable" })
  res.json(result)
})

module.exports = {
  submit,
  getAll,
  getOne
}
