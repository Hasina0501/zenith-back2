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

// C'est pour creer un test avec ces données d'un coup (Plusieurs question , etc....)
const createTestFull = async (data) => {
  return prisma.test.create({
    data: {
      title: data.title,
      type: data.type,
      active: data.active,
      offerId: data.offerId,
      questions: {
        create: data.questions.map((q) => ({
          content: q.content,
          questionType: q.questionType,
          points: q.points,
          answers: {
            create: q.answers
          }
        }))
      }
    },
    include: {
      questions: {
        include: {
          answers: true
        }
      }
    }
  })
}

module.exports = {
  createTest,
  getAllTest,
  getTestId,
  updateTest,
  deleteTest,
  createTestFull
}
