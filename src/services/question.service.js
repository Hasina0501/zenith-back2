const prisma = require("../config/prisma")

// Créer une nouvelle question
const createQuestion = async (data) => {
  return prisma.question.create({ data })
}

// Récupérer toutes les questions avec leurs réponses
const getAllQuestion = async () => {
  return prisma.question.findMany({
    include: {
      test: true,
      answers: true
    }
  })
}

// Récupérer une question avec son ID
const getQuestionId = async (id) => {
  return prisma.question.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      test: true,
      answers: true
    }
  })
}

// Mise à jour d'une question
const updateQuestion = async (id, data) => {
  return prisma.question.update({
    where: { id: Number(id) },
    data
  })
}

// Supprimer une question
const deleteQuestion = async (id) => {
  return prisma.question.delete({
    where: { id: Number(id) }
  })
}

module.exports = {
  createQuestion,
  getAllQuestion,
  getQuestionId,
  updateQuestion,
  deleteQuestion
}
