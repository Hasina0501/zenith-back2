const prisma = require("../config/prisma")

// Creer un nouveau candidat
const createCandidate = async (data) => {
  return prisma.candidate.create({ data })
}


// Récupérer tous les liste des candidats avec les offre qu'il ont postuler
const getAllCandidate = async (data) => {
  return prisma.candidate.findMany({
    data,
    include: {
      offer: true,
      results: true
    }
  })
}


// Récupérer un candidat avec son ID
const getCandidateId = async (id) => {
  return prisma.candidate.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      offer: true,
      results: true,
    }

  })
}

// Mise à jour d'un candidat
const updateCandidate = async (id,data) => {
  return prisma.candidate.update({
    where: { id: Number(id) },
    data
  })
}

// Pour supprimer un candidat
const deleteCandidate = async (id) => {
  return prisma.candidate.delete({
    where: { id: Number(id) }
  })
}


module.exports = {
  createCandidate,
  getAllCandidate,
  getCandidateId,
  updateCandidate,
  deleteCandidate
}