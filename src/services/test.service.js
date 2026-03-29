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

// Récupérer tous les tests avec les questions et réponses (D'un coup)
const getAllTestFull = async () => {
  return prisma.test.findMany({
    include: {
      offer: true,
      questions: {
        include: {
          answers: true
        }
      }
    }
  })
}

// Récupérer un test complet avec son ID (D'un coup)
const getTestFullById = async (id) => {
  return prisma.test.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      offer: true,
      questions: {
        include: {
          answers: true
        }
      }
    }
  })
}

// Mise à jour d'un test complet avec ses questions et réponses
const updateTestFull = async (id, data) => {
  return prisma.$transaction(async (tx) => {
    // 1. Mettre à jour les informations de base du test
    await tx.test.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        type: data.type,
        active: data.active,
        offerId: data.offerId,
      }
    });

    // 2. Supprimer les anciennes questions et réponses
    const existingQuestions = await tx.question.findMany({
      where: { testId: Number(id) }
    });
    const questionIds = existingQuestions.map(q => q.id);

    if (questionIds.length > 0) {
      await tx.answer.deleteMany({
        where: { questionId: { in: questionIds } }
      });
      await tx.question.deleteMany({
        where: { testId: Number(id) }
      });
    }

    // 3. Créer les nouvelles questions et réponses si fournies
    if (data.questions && data.questions.length > 0) {
      for (const q of data.questions) {
        await tx.question.create({
          data: {
            content: q.content,
            questionType: q.questionType,
            points: q.points,
            testId: Number(id),
            answers: {
              create: q.answers || []
            }
          }
        });
      }
    }

    // 4. Retourner le test complet mis à jour
    return tx.test.findUnique({
      where: { id: Number(id) },
      include: {
        offer: true,
        questions: {
          include: {
            answers: true
          }
        }
      }
    });
  });
}

// Supprimer un test d'un coup (et toutes ses questions/réponses en cascade)
const deleteTestFull = async (id) => {
  return prisma.$transaction(async (tx) => {
    const existingQuestions = await tx.question.findMany({
      where: { testId: Number(id) }
    });
    const questionIds = existingQuestions.map(q => q.id);

    // Supprimer les réponses associées aux questions
    if (questionIds.length > 0) {
      await tx.answer.deleteMany({
        where: { questionId: { in: questionIds } }
      });
      // Supprimer les questions
      await tx.question.deleteMany({
        where: { testId: Number(id) }
      });
    }

    // Finir par supprimer le test
    return tx.test.delete({
      where: { id: Number(id) }
    });
  });
}

module.exports = {
  createTest,
  getAllTest,
  getTestId,
  updateTest,
  deleteTest,
  createTestFull,
  getAllTestFull,
  getTestFullById,
  updateTestFull,
  deleteTestFull
}
