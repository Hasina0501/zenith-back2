const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginService = async (payload)=>{
    const {email, password} = payload;
    const user = await prisma.User.findUnique({ where: { email } }); //trouver l' email
    const validPassword = await bcrypt.compare(password, user.password); //verifier le password
    
    if (!user) throw new Error("Utilisateur introuvable"); // user innexistant
    
    if (!validPassword) throw new Error("mot de passe incorrect");  // si password incorect
    
    //creation du token unique
    const token = jwt.sign(
        {
        id: user.id,
        role: user.role 
    },
    process.env.JWT_SECRET, //mot secret dans .env
    { expiresIn: "1d" }  // exipire dans 1jour
);

    return {token}
}

module.exports = {loginService}