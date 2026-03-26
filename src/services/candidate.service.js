const prisma = require("../config/prisma")
const jwt = require("jsonwebtoken")

// Creer un nouveau candidat
const createCandidate = async (payload) => {
  
  const {email, name, phone, cv, applicationStatus, offerId} = payload
  
  //creation du token unique
  const token = jwt.sign(
    {
        email: payload.email, 
      },
      process.env.JWT_SECRET, //mot secret dans .env
    );
    
    const candidate = await prisma.candidate.create({ 
        data:{
          email: email,
          name: name,
          phone: phone,
          cv: cv,
          applicationStatus: applicationStatus,
          offerId: offerId,
          token: token
        }
      })
  
  return {candidate,token}
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