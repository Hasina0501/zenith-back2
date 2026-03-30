const prisma = require("../config/prisma")

// Créer une nouvelle offre
const createOffer = async (data) => {
  return prisma.offer.create({ data })
}

// Récupérer toutes les offres avec les relations
const getAllOffer = async () => {
  return prisma.offer.findMany({
    include: {
      user: true,
      candidates: true,
      tests: true
    }
  })
}

// Récupérer une offre avec son ID
const getOfferId = async (id) => {
  return prisma.offer.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      user: true,
      candidates: true,
      tests: true
    }
  })
}

// Mise à jour d'une offre
const updateOffer = async (id, data) => {
  return prisma.offer.update({
    where: { id: Number(id) },
    data
  })
}

// Mise à jour du statut  d'une offre
const updateOfferStatus = async (id, data) => {
  return await prisma.offer.update({
    where: { id: id},
    data: {status: data.status}
  })
}


// Supprimer une offre
const deleteOffer = async (id) => {
  return prisma.offer.delete({
    where: { id: Number(id) }
  })
}

module.exports = {
  createOffer,
  getAllOffer,
  getOfferId,
  updateOffer,
  updateOfferStatus,
  deleteOffer
}
