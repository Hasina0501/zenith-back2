const prisma = require("../config/prisma")

// Créer une nouvelle réponse
const createAnswer = async (data) => {
  return prisma.answer.create({ data })
}

// Récupérer toutes les réponses
const getAllAnswer = async () => {
  return prisma.answer.findMany({
    include: {
      question: true
    }
  })
}

// Récupérer une réponse avec son ID
const getAnswerId = async (id) => {
  return prisma.answer.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      question: true
    }
  })
}

// Mise à jour d'une réponse
const updateAnswer = async (id, data) => {
  return prisma.answer.update({
    where: { id: Number(id) },
    data
  })
}

// Supprimer une réponse
const deleteAnswer = async (id) => {
  return prisma.answer.delete({
    where: { id: Number(id) }
  })
}

module.exports = {
  createAnswer,
  getAllAnswer,
  getAnswerId,
  updateAnswer,
  deleteAnswer
}
