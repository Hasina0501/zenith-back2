const prisma = require("../config/prisma")

// Soumettre un test et calculer le score
const submitTest = async (candidateId, testId, candidateAnswers) => {
  let totalScore = 0

  // Récupérer toutes les questions et les réponses correctes pour ce test
  const test = await prisma.test.findUnique({
    where: { id: Number(testId) },
    include: {
      questions: {
        include: {
          answers: true
        }
      }
    }
  })

  if (!test) {
    throw new Error("Test non trouvé")
  }

  // Calcul du score
  for (const candidateAnswer of candidateAnswers) {
    const question = test.questions.find(q => q.id === candidateAnswer.questionId)
    
    if (question) {
      // Trouver la réponse correcte pour cette question
      const correctAnswer = question.answers.find(a => a.isCorrect)
      
      // Si le candidat a choisi la bonne réponse, ajouter les points
      if (correctAnswer && correctAnswer.id === candidateAnswer.answerId) {
        totalScore += question.points
      }
    }
  }

  // Sauvegarder le résultat
  const result = await prisma.result.create({
    data: {
      score: totalScore,
      testDate: new Date(),
      candidateId: Number(candidateId)
    }
  })

  return {
    result,
    totalScore,
    maxPossibleScore: test.questions.reduce((acc, q) => acc + q.points, 0)
  }
}

// Récupérer tous les résultats
const getAllResult = async () => {
  return prisma.result.findMany({
    include: {
      candidate: true
    }
  })
}

// Récupérer un résultat par ID
const getResultId = async (id) => {
  return prisma.result.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      candidate: true
    }
  })
}

module.exports = {
  submitTest,
  getAllResult,
  getResultId
}
