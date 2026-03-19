# Zenith Backend API Documentation

## 📋 Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Routes API](#routes-api)
  - [Admin Routes](#admin-routes)
  - [Candidate Routes](#candidate-routes)
  - [Offer Routes](#offer-routes)
  - [Dashboard Routes](#dashboard-routes)
  - [Test Routes](#-test-routes)
  - [Question Routes](#-question-routes)
  - [Answer Routes](#-answer-routes)
  - [Result Routes](#-result-routes-soumission)
- [Scripts de gestion](#scripts-de-gestion)
- [Base de données](#base-de-données)

---

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Démarrer le serveur
npm start
```

---

## ⚙️ Configuration

1. **Copier le fichier d'environnement :**
   ```bash
   cp .env.example .env
   ```

2. **Configurer la base de données dans `.env` :**
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/zenith_db?schema=public"
   ```

3. **Lancer les migrations :**
   ```bash
   npm run prisma:migrate
   ```

---

## 🛣️ Routes API

### Base URL
```
http://localhost:5000
```

---

### 👤 Admin Routes

**Base Path :** `/api/admin`

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/admin/register` | Créer un admin | ❌ |
| POST | `/admin/login` | Connexion admin | ❌ |
| GET | `/admin/profile` | Profil admin | ✅ |
| PUT | `/admin/update` | Mettre à jour admin | ✅ |
| DELETE | `/admin/delete` | Supprimer admin | ✅ |

---

### 🎯 Candidate Routes

**Base Path :** `/api/candidate`

| Méthode | Endpoint | Description | Validation |
|---------|----------|-------------|------------|
| POST | `/create_candidate` | Créer un candidat | ✅ |
| GET | `/get_all_candidate` | Lister tous les candidats | ❌ |
| GET | `/get_one_candidate/:id` | Récupérer un candidat | ❌ |
| PUT | `/update_candidate/:id` | Mettre à jour un candidat | ✅ |
| DELETE | `/delete_candidate/:id` | Supprimer un candidat | ❌ |

#### 📝 Validation pour création
Champs requis :
- `name` (String)
- `email` (String) 
- `offerId` (Number)

**Exemple de requête :**
```json
POST /api/candidate/create_candidate
{
  "name": "Jean Dupont",
  "email": "jean.dupont@email.com",
  "offerId": 1,
  "phone": "0612345678",
  "cv": "cv_jean_dupont.pdf",
  "submissionDate": "2024-01-15T10:00:00Z",
  "applicationStatus": "PENDING"
}
```

---

### 💼 Offer Routes

**Base Path :** `/api/offer`

| Méthode | Endpoint | Description | Validation |
|---------|----------|-------------|------------|
| POST | `/create_offer` | Créer une offre | ✅ |
| GET | `/get_all_offer` | Lister toutes les offres | ❌ |
| GET | `/get_one_offer/:id` | Récupérer une offre | ❌ |
| PUT | `/update_offer/:id` | Mettre à jour une offre | ✅ |
| DELETE | `/delete_offer/:id` | Supprimer une offre | ❌ |

#### 📝 Validation pour création
Champs requis :
- `title` (String)
- `description` (String)
- `publicationDate` (DateTime)
- `deadlineDate` (DateTime)
- `status` (String)
- `userId` (Number)

**Exemple de requête :**
```json
POST /api/offer/create_offer
{
  "title": "Développeur Full Stack",
  "description": "Nous recherchons un développeur expérimenté...",
  "publicationDate": "2024-01-15T00:00:00Z",
  "deadlineDate": "2024-02-15T00:00:00Z",
  "status": "PUBLISHED",
  "userId": 1
}
```

---

### 📊 Dashboard Routes

**Base Path :** `/api/dashboard`

| Méthode | Endpoint | Description | Validation |
|---------|----------|-------------|------------|
| GET | `/candidates` | Liste des candidats avec pagination et filtres | ✅ |
| GET | `/candidates/:id` | Détails complets d'un candidat | ❌ |
| GET | `/candidates/:id/download-cv` | Télécharger le CV d'un candidat | ❌ |
| GET | `/stats` | Statistiques du dashboard | ❌ |
| PUT | `/candidates/:id/status` | Mettre à jour le statut d'un candidat | ✅ |

#### 📝 Paramètres pour liste des candidats
Query params optionnels :
- `page` (Number) - Page par défaut : 1
- `limit` (Number) - Nombre par défaut : 10 (max: 100)
- `status` (String) - Filtre par statut : PENDING, REVIEWING, ACCEPTED, REJECTED
- `search` (String) - Recherche par nom ou email

**Exemple de requête :**
```bash
GET /api/dashboard/candidates?page=1&limit=10&status=PENDING&search=jean
```

#### 📝 Validation pour mise à jour de statut
Champs requis :
- `status` (String) - PENDING, REVIEWING, ACCEPTED, REJECTED

**Exemple de requête :**
```json
PUT /api/dashboard/candidates/1/status
{
  "status": "REVIEWING"
}
```

---

### 📝 Test Routes

**Base Path :** `/api/test`

| Méthode | Endpoint | Description | Validation |
|---------|----------|-------------|------------|
| POST | `/create_test` | Créer un test | ✅ |
| POST | `/full` |Créer un test complet (test + questions + réponses) | ✅ |
| GET | `/get_all_test` | Lister tous les tests | ❌ |
| GET | `/get_one_test/:id` | Récupérer un test | ❌ |
| PUT | `/update_test/:id` | Mettre à jour un test | ✅ |
| DELETE | `/delete_test/:id` | Supprimer un test | ❌ |

#### 📝 Validation pour création
Champs requis :
- `title` (String)
- `type` (String)
- `active` (Boolean)
- `offerId` (Number)

**Exemple de requête :**
```json
POST /api/test/create_test
{
  "title": "Test de base React",
  "type": "QCM",
  "active": true,
  "offerId": 1
}
```

```json
POST /api/test/full
{
  "title": "Test Backend",
  "type": "QCM",
  "active": true,
  "offerId": 1,
  "questions": [
    {
      "content": "Qu'est-ce que Node.js ?",
      "questionType": "MULTIPLE_CHOICE",
      "points": 5,
      "answers": [
        {
          "content": "Un runtime JavaScript",
          "isCorrect": true
        },
        {
          "content": "Un framework",
          "isCorrect": false
        }
      ]
    },
    {
      "content": "Prisma sert à quoi ?",
      "questionType": "MULTIPLE_CHOICE",
      "points": 5,
      "answers": [
        {
          "content": "ORM base de données",
          "isCorrect": true
        },
        {
          "content": "Framework frontend",
          "isCorrect": false
        }
      ]
    }
  ]
}
```

---

### ❓ Question Routes

**Base Path :** `/api/question`

| Méthode | Endpoint | Description | Validation |
|---------|----------|-------------|------------|
| POST | `/create_question` | Créer une question | ✅ |
| GET | `/get_all_question` | Lister toutes les questions | ❌ |
| GET | `/get_one_question/:id` | Récupérer une question | ❌ |
| PUT | `/update_question/:id` | Mettre à jour une question | ✅ |
| DELETE | `/delete_question/:id` | Supprimer une question | ❌ |

#### 📝 Validation pour création
Champs requis :
- `content` (String)
- `questionType` (String)
- `points` (Number)
- `testId` (Number)

**Exemple de requête :**
```json
POST /api/question/create_question
{
  "content": "Qu'est-ce qu'un Hook React ?",
  "questionType": "RADIO",
  "points": 10,
  "testId": 1
}
```

---

### 💡 Answer Routes

**Base Path :** `/api/answer`

| Méthode | Endpoint | Description | Validation |
|---------|----------|-------------|------------|
| POST | `/create_answer` | Créer une réponse | ✅ |
| GET | `/get_all_answer` | Lister toutes les réponses | ❌ |
| GET | `/get_one_answer/:id` | Récupérer une réponse | ❌ |
| PUT | `/update_answer/:id` | Mettre à jour une réponse | ✅ |
| DELETE | `/delete_answer/:id` | Supprimer une réponse | ❌ |

#### 📝 Validation pour création
Champs requis :
- `content` (String)
- `isCorrect` (Boolean)
- `questionId` (Number)

**Exemple de requête :**
```json
POST /api/answer/create_answer
{
  "content": "Une fonction spéciale qui permet de se brancher sur des fonctionnalités React",
  "isCorrect": true,
  "questionId": 1
}
```

---

### 🏆 Result Routes (Soumission)

**Base Path :** `/api/result`

| Méthode | Endpoint | Description | Validation |
|---------|----------|-------------|------------|
| POST | `/submit_test` | Soumettre un test et calculer le score | ✅ |
| GET | `/get_all_result` | Lister tous les résultats | ❌ |
| GET | `/get_one_result/:id` | Récupérer un résultat spécifique | ❌ |

#### 📝 Validation pour soumission
Champs requis :
- `candidateId` (Number)
- `testId` (Number)
- `answers` (Array d'objets : `{ questionId, answerId }`)

**Exemple de requête :**
```json
POST /api/result/submit_test
{
  "candidateId": 1,
  "testId": 1,
  "answers": [
    {
      "questionId": 1,
      "answerId": 1
    }
  ]
}
```

---

## 📊 Scripts de gestion

### Scripts npm disponibles

| Commande | Description |
|----------|-------------|
| `npm run seed:offers` | Insérer des données de test pour les offres |
| `npm run list:offers` | Lister toutes les offres existantes |
| `npm run clear:offers` | Supprimer toutes les offres |
| `npm run prisma:studio` | Ouvrir Prisma Studio |
| `npm run prisma:migrate` | Lancer les migrations |
| `npm run prisma:generate` | Générer le client Prisma |

### Utilisation du script principal

```bash
# Insérer des données
node script.js seed

# Lister les offres
node script.js list

# Supprimer les offres
node script.js clear
```

---

## 🗄️ Base de données

### Schéma Prisma

L'application utilise **PostgreSQL** avec les modèles suivants :

- **User** - Utilisateurs/Administrateurs
- **Offer** - Offres d'emploi
- **Candidate** - Candidats
- **Form / FormField** - Formulaires dynamiques
- **Test / Question / Answer** - Tests techniques
- **Result** - Résultats des tests

### Relations principales

```
User (1) → (N) Offer
Offer (1) → (N) Candidate
Offer (1) → (N) Test
Test (1) → (N) Question
Question (1) → (N) Answer
Candidate (1) → (N) Result
Form (1) → (N) FormField
```

---

## 🔧 Développement

### Structure du projet

```
src/
├── app.js              # Configuration Express
├── server.js           # Point d'entrée du serveur
├── config/
│   └── prisma.js       # Configuration Prisma
├── controllers/        # Logique des contrôleurs
├── middlewares/        # Middlewares de validation
├── routes/            # Définition des routes
├── services/         # Logique métier
└── utils/            # Utilitaires

prisma/
└── schema.prisma      # Schéma de la base de données

scripts/
└── seed-offers.js     # Script d'insertion de données
```

### Conventions

- **Controllers** : Gèrent les requêtes/réponses HTTP
- **Services** : Contiennent la logique métier
- **Middlewares** : Validation et traitement intermédiaire
- **Routes** : Définition des endpoints API

---

## 📝 Exemples d'utilisation

### 1. Créer une offre

```bash
curl -X POST http://localhost:5000/api/offer/create_offer \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Développeur React",
    "description": "Poste pour développeur React senior",
    "publicationDate": "2024-01-15T00:00:00Z",
    "deadlineDate": "2024-02-15T00:00:00Z",
    "status": "PUBLISHED",
    "userId": 1
  }'
```

### 2. Créer un test pour une offre

```bash
curl -X POST http://localhost:5000/api/test/create_test \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test de base React",
    "type": "QCM",
    "active": true,
    "offerId": 1
  }'
```

---

## 🚨 Erreurs communes

### 1. Erreur de connexion Prisma
```
PrismaClientInitializationError: Invalid database credentials
```
**Solution** : Vérifiez votre fichier `.env` et assurez-vous que PostgreSQL est démarré.

### 2. Validation échouée
```
400 Bad Request - Ces champs sont requis
```
**Solution** : Vérifiez que tous les champs requis sont présents dans votre requête.

### 3. Route non trouvée
```
404 Not Found
```
**Solution** : Vérifiez l'URL et la méthode HTTP utilisée.

---

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2024