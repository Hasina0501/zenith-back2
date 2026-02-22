const app = require('./app')
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`serveur en etat de marche sur le port ${PORT}`);
})