const offerService = require("../services/offer.service")
const asyncHandler = require("../utils/asyncHandler")

// Fonction pour la création d'une nouvelle offre
const create = asyncHandler(async (req, res) => {
  const offer = await offerService.createOffer(req.body)
  res.status(201).json(offer)
})

// Pour récupérer toutes les offres
const getAll = asyncHandler(async (req, res) => {
  const offers = await offerService.getAllOffer()
  res.json(offers)
})

// Pour récupérer une offre avec son ID
const getOne = asyncHandler(async (req, res) => {
  const offer = await offerService.getOfferId(req.params.id)

  if (!offer) return res.status(404).json({ message: "Offre introuvable" })
  res.json(offer)
})

// Pour la mise à jour d'une offre
const update = asyncHandler(async (req, res) => {
  const offer = await offerService.updateOffer(
    req.params.id,
    req.body
  )
  res.json(offer)
})

// Pour supprimer une offre
const remove = asyncHandler(async (req, res) => {
  await offerService.deleteOffer(req.params.id)
  res.json({ message: "Offre supprimée avec succès" })
})

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}
