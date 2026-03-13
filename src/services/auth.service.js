const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginService = async (payload)=>{
    const {email, password} = payload;
    const user = await prisma.User.findUnique({ where: { email } }); //trouver l' email
    const validPassword = await bcrypt.compare(password, user.password); //verifier le password

    if (!validPassword) res.status(500).json({message: "mot de passe incorrect"});  // si password incorect
    //creation du token unique
    const token = jwt.sign(
        {
        id: user.id,
        role: user.role 
    },
    process.env.JWT_SECRET, //mot secret dans .env
    { expiresIn: "1d" }  // exipire dans 1jour
);

    // met à jour le status dans user
    await prisma.User.update({
        where: { id: user.id },
        data: { isLoggedIn: true}
    })

    return {token}
}

//  fonction de deconnexion
const logoutService = async (userId)=>{
    await prisma.User.update({
        where: { id: userId },
        data: { isLoggedIn: false}  // met à jour le status
    })
} 
// supprimer le token en front



module.exports = {loginService, logoutService}