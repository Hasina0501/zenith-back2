const prisma = require("../config/prisma")

// Récupérer tous les candidats avec pagination et filtres
const getAllCandidatesWithFilters = async ({ page, limit, status, search }) => {
  const skip = (page - 1) * limit
  
  const where = {}
  
  // Filtre par statut
  if (status) {
    where.applicationStatus = status
  }
  
  // Recherche par nom ou email
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  }
  
  const [candidates, total] = await Promise.all([
    prisma.candidate.findMany({
      where,
      skip,
      take: limit,
      include: {
        offer: {
          select: {
            id: true,
            title: true,
            status: true
          }
        },
        results: {
          select: {
            id: true,
            score: true,
            testDate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prisma.candidate.count({ where })
  ])
  
  return { candidates, total }
}

// Récupérer les détails complets d'un candidat
const getCandidateFullDetails = async (id) => {
  return prisma.candidate.findUnique({
    where: { id: Number(id) },
    include: {
      offer: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          tests: {
            select: {
              id: true,
              title: true,
              type: true
            }
          }
        }
      },
      results: {
        include: {
          candidate: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          testDate: 'desc'
        }
      }
    }
  })
}

// Récupérer un candidat par ID
const getCandidateById = async (id) => {
  return prisma.candidate.findUnique({
    where: { id: Number(id) }
  })
}

// Récupérer les statistiques du dashboard
const getDashboardStatistics = async () => {
  const [
    totalCandidates,
    pendingCandidates,
    reviewingCandidates,
    acceptedCandidates,
    rejectedCandidates,
    recentCandidates,
    candidatesByOffer
  ] = await Promise.all([
    // Total des candidats
    prisma.candidate.count(),
    
    // Candidats par statut
    prisma.candidate.count({ where: { applicationStatus: 'PENDING' } }),
    prisma.candidate.count({ where: { applicationStatus: 'REVIEWING' } }),
    prisma.candidate.count({ where: { applicationStatus: 'ACCEPTED' } }),
    prisma.candidate.count({ where: { applicationStatus: 'REJECTED' } }),
    
    // Candidats récents (derniers 7 jours)
    prisma.candidate.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    
    // Candidats par offre
    prisma.offer.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            candidates: true
          }
        }
      },
      orderBy: {
        candidates: {
          _count: 'desc'
        }
      },
      take: 5
    })
  ])
  
  return {
    total: totalCandidates,
    byStatus: {
      pending: pendingCandidates,
      reviewing: reviewingCandidates,
      accepted: acceptedCandidates,
      rejected: rejectedCandidates
    },
    recent: recentCandidates,
    topOffers: candidatesByOffer
  }
}

// Mettre à jour le statut d'un candidat
const updateCandidateStatus = async (id, status) => {
  return prisma.candidate.update({
    where: { id: Number(id) },
    data: { 
      applicationStatus: status,
      updatedAt: new Date()
    },
    include: {
      offer: {
        select: {
          id: true,
          title: true
        }
      }
    }
  })
}

module.exports = {
  getAllCandidatesWithFilters,
  getCandidateFullDetails,
  getCandidateById,
  getDashboardStatistics,
  updateCandidateStatus
}
