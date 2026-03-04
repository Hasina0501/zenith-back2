const prisma = require("../src/config/prisma");

async function createTestData() {
  // Créer un utilisateur test (si tu n'en as pas)
  const user = await prisma.user.create({
    data: {
      name: "Admiqdvn Test",
      email: "admidvsvn@test.com",
      password: "password123"
    }
  });

  // Créer une offre test
  const offer = await prisma.offer.create({
    data: {
      title: "Développeur Java",
      description: "Offre d'emploie",
      publicationDate: new Date(),
      deadlineDate: new Date(Date.now() + 7*24*3600*1000),
      status: "open",
      userId: user.id
    }
  });

  console.log("Offre test créée avec ID:", offer.id);
}

createTestData();