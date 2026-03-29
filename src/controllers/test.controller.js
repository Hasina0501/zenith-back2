const testService = require("../services/test.service")
const asyncHandler = require("../utils/asyncHandler")

// Fonction pour la création d'un nouveau test
const create = asyncHandler(async (req, res) => {
  const test = await testService.createTest(req.body)
  res.status(201).json(test)
})

// Pour récupérer tous les tests
const getAll = asyncHandler(async (req, res) => {
  const tests = await testService.getAllTest()
  res.json(tests)
})

// Pour récupérer un test avec son ID
const getOne = asyncHandler(async (req, res) => {
  const test = await testService.getTestId(req.params.id)

  if (!test) return res.status(404).json({ message: "Test introuvable" })
  res.json(test)
})

// Pour la mise à jour d'un test
const update = asyncHandler(async (req, res) => {
  const test = await testService.updateTest(
    req.params.id,
    req.body
  )
  res.json(test)
})

// Pour supprimer un test
const remove = asyncHandler(async (req, res) => {
  await testService.deleteTest(req.params.id)
  res.json({ message: "Test supprimé avec succès" })
})


// C'est le controlleur du teste d'un coup 😂
const createTestFullController = asyncHandler(async (req, res) => {
  const result = await testService.createTestFull(req.body)

  res.status(201).json({
    success: true,
    message: "Test créé avec succès",
    data: result
  })
})

// Pour récupérer tous les tests complets
const getAllFullController = asyncHandler(async (req, res) => {
  const tests = await testService.getAllTestFull()
  res.json({
    success: true,
    data: tests
  })
})

// Pour récupérer un seul test complet
const getOneFullController = asyncHandler(async (req, res) => {
  const test = await testService.getTestFullById(req.params.id)
  if (!test) return res.status(404).json({ success: false, message: "Test introuvable" })
  res.json({
    success: true,
    data: test
  })
})

// Pour la mise à jour d'un test complet
const updateFullController = asyncHandler(async (req, res) => {
  const test = await testService.updateTestFull(req.params.id, req.body)
  res.json({
    success: true,
    message: "Test complet mis à jour avec succès",
    data: test
  })
})

// Pour supprimer un test complet
const deleteFullController = asyncHandler(async (req, res) => {
  await testService.deleteTestFull(req.params.id)
  res.json({
    success: true,
    message: "Test complet supprimé avec succès"
  })
})

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  createTestFullController,
  getAllFullController,
  getOneFullController,
  updateFullController,
  deleteFullController
}
