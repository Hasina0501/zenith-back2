const prisma = require("../config/prisma")

// Créer un nouveau test
const createTest = async (data) => {
  return prisma.test.create({ data })
}

// Récupérer tous les tests avec les questions
const getAllTest = async () => {
  return prisma.test.findMany({
    include: {
      offer: true,
      questions: true
    }
  })
}

// Récupérer un test avec son ID
const getTestId = async (id) => {
  return prisma.test.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      offer: true,
      questions: true
    }
  })
}

// Mise à jour d'un test
const updateTest = async (id, data) => {
  return prisma.test.update({
    where: { id: Number(id) },
    data
  })
}

// Supprimer un test
const deleteTest = async (id) => {
  return prisma.test.delete({
    where: { id: Number(id) }
  })
}

module.exports = {
  createTest,
  getAllTest,
  getTestId,
  updateTest,
  deleteTest
}
