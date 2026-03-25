const prisma = require("../config/prisma")

// Créer un nouvel article
const createArticle = async (data) => {
  return prisma.article.create({ data })
}

// Récupérer tous les articles avec l'auteur
const getAllArticle = async () => {
  return prisma.article.findMany({
    include: {
      author: true
    }
  })
}

// Récupérer un article avec son ID
const getArticleId = async (id) => {
  return prisma.article.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      author: true
    }
  })
}

// Mise à jour d'un article
const updateArticle = async (id, data) => {
  return prisma.article.update({
    where: { id: Number(id) },
    data
  })
}

// Supprimer un article
const deleteArticle = async (id) => {
  return prisma.article.delete({
    where: { id: Number(id) }
  })
}

module.exports = {
  createArticle,
  getAllArticle,
  getArticleId,
  updateArticle,
  deleteArticle
}
