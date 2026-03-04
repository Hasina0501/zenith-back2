const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedOffers() {
  try {
    // Création d'un utilisateur de test si nécessaire
    const user = await prisma.user.findFirst()
    
    if (!user) {
      console.log('Veuillez d\'abord créer un utilisateur dans la table User')
      return
    }

    // Données de test pour les offres
    const offers = [
      {
        title: "Développeur Full Stack Senior",
        description: "Nous recherchons un développeur Full Stack expérimenté avec 5+ ans d'expérience en React et Node.js. Vous travaillerez sur des projets innovants et serez responsable du développement complet de nos applications web.",
        publicationDate: new Date('2024-01-15'),
        deadlineDate: new Date('2024-02-15'),
        status: "PUBLISHED",
        userId: user.id
      },
      {
        title: "Data Scientist",
        description: "Poste pour un Data Scientist spécialisé en machine learning. Compétences requises : Python, TensorFlow, et expérience en analyse de données massives.",
        publicationDate: new Date('2024-01-20'),
        deadlineDate: new Date('2024-02-20'),
        status: "PUBLISHED",
        userId: user.id
      },
      {
        title: "DevOps Engineer",
        description: "Nous cherchons un ingénieur DevOps pour gérer notre infrastructure cloud. Expérience avec AWS, Docker, Kubernetes requise.",
        publicationDate: new Date('2024-01-25'),
        deadlineDate: new Date('2024-02-25'),
        status: "DRAFT",
        userId: user.id
      },
      {
        title: "UI/UX Designer",
        description: "Designer créatif pour améliorer l'expérience utilisateur de nos produits. Maîtrise de Figma et des principes de design moderne.",
        publicationDate: new Date('2024-02-01'),
        deadlineDate: new Date('2024-03-01'),
        status: "PUBLISHED",
        userId: user.id
      },
      {
        title: "Product Manager",
        description: "Chef de produit pour gérer le cycle de vie de nos applications. Expérience en agilité et gestion d'équipe technique requise.",
        publicationDate: new Date('2024-02-05'),
        deadlineDate: new Date('2024-03-05'),
        status: "CLOSED",
        userId: user.id
      }
    ]

    // Insertion des offres
    console.log('Insertion des offres...')
    for (const offerData of offers) {
      const offer = await prisma.offer.create({
        data: offerData
      })
      console.log(`✅ Offre créée: ${offer.title}`)
    }

    console.log('\n🎉 Toutes les offres ont été insérées avec succès!')

    // Affichage des offres créées
    const allOffers = await prisma.offer.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    console.log('\n📋 Liste des offres créées:')
    allOffers.forEach((offer, index) => {
      console.log(`${index + 1}. ${offer.title} - ${offer.status} - Par: ${offer.user.name}`)
    })

  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des offres:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le script
seedOffers()
