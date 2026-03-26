const candidateService = require("../services/candidate.service")
const {generateEmail, sendMail} = require("../services/mail.service")

// on utilise ceci au lieu de faire des try, catch a chaque fois 
const asyncHandler = require("../utils/asyncHandler")


// Fonction pour la creation d'un nouveau candidat
const create = asyncHandler(async (req, res) => {
  const {email, name, phone, cv, applicationStatus, offerId} = req.body
  const candidate = await candidateService.createCandidate(req.body)
  await sendMail(email, (await generateEmail(email)).testLink)
  res.status(201).json(candidate)
})


// Pour récupérer tous les liste des candidats
const getAll = asyncHandler(async (req, res) => {
  const candidates = await candidateService.getAllCandidate(req.body)
  res.json(candidates)
})


// Pour récupérer un candidat avec son ID
const getOne = asyncHandler(async (req, res) => {
  const candidate = await candidateService.getCandidateId(req.params.id)

  if (!candidate) return res.status(404).json({ message: "Candidat introuvable" })
  res.json(candidate)
})



// Pour la mise à jour d'un candidat
const update = asyncHandler(async (req, res) => {
  const candidate = await candidateService.updateCandidate(
    req.params.id,
    req.body
  )
  res.json(candidate)
})


const remove = asyncHandler(async (req, res) => {
  await candidateService.deleteCandidate(req.params.id)
  res.json({ message: "Candidat suppromé avec succès" })
})


module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}