const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { loginService } = require("../services/auth.service")
const { success, error } = require("../utils/response.utils")

const login = async (req, res) => {
        const { email, password } = req.body; // les donnés utile
        const user = await prisma.User.findUnique({ where: { email } }); //trouver l' email
        
        if (!user) throw new Error("Utilisateur introuvable"); // user innexistant
        
        if(!email || !password) throw new Error("les champs sont requis"); //verification champ vide
        const connected =  await loginService(req.body)
        return success(res, user, "vous etes connecter", 200);
  
};

module.exports = {login}