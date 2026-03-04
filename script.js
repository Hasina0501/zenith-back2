const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Script principal pour gérer les données de la table offre
async function manageOffers() {
  const action = process.argv[2] // Récupère l'action passée en ligne de commande

  try {
    switch (action) {
      case 'seed':
        await seedOffers()
        break
      case 'list':
        await listOffers()
        break
      case 'clear':
        await clearOffers()
        break
      default:
        console.log(`
📋 Usage: node script.js [action]

Actions disponibles:
  seed   - Insérer des données de test dans la table offre
  list   - Lister toutes les offres existantes
  clear  - Supprimer toutes les offres (attention!)

Exemples:
  node script.js seed
  node script.js list
        `)
    }
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Insérer des données de test
async function seedOffers() {
  console.log('🌱 Début de l\'insertion des données...')

  // Vérifier s'il existe déjà un utilisateur
  let user = await prisma.user.findFirst()
  
  if (!user) {
    console.log('👤 Création d\'un utilisateur de test...')
    user = await prisma.user.create({
      data: {
        name: "Admin Test",
        email: "admin@test.com",
        password: "password123" // En production, utilisez un hash!
      }
    })
    console.log(`✅ Utilisateur créé: ${user.name}`)
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
  console.log('💼 Insertion des offres...')
  for (const offerData of offers) {
    const offer = await prisma.offer.create({
      data: offerData
    })
    console.log(`✅ Offre créée: ${offer.title}`)
  }

  console.log('\n🎉 Toutes les offres ont été insérées avec succès!')
}

// Lister toutes les offres
async function listOffers() {
  console.log('📋 Liste des offres existantes:')
  
  const offers = await prisma.offer.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      },
      candidates: true,
      tests: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (offers.length === 0) {
    console.log('❌ Aucune offre trouvée')
    return
  }

  offers.forEach((offer, index) => {
    console.log(`
${index + 1}. ${offer.title}
   📝 Description: ${offer.description.substring(0, 100)}...
   📅 Publication: ${offer.publicationDate.toLocaleDateString()}
   ⏰ Deadline: ${offer.deadlineDate.toLocaleDateString()}
   📊 Status: ${offer.status}
   👤 Créé par: ${offer.user.name}
   📈 Candidats: ${offer.candidates.length}
   🧪 Tests: ${offer.tests.length}
   `)
  })

  console.log(`\n📊 Total: ${offers.length} offre(s)`)
}

// Supprimer toutes les offres
async function clearOffers() {
  console.log('⚠️  Suppression de toutes les offres...')
  
  const result = await prisma.offer.deleteMany({})
  console.log(`🗑️  ${result.count} offre(s) supprimée(s)`)
}

// Exécuter le script
if (require.main === module) {
  manageOffers()
}

module.exports = {
  seedOffers,
  listOffers,
  clearOffers
}
