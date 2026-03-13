const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { loginService, logoutService } = require("../services/auth.service")
const { success, error } = require("../utils/response.utils")

const login = async (req, res) => {
        const { email, password } = req.body; // les donnés utile
        const user = await prisma.User.findUnique({ where: { email } }); //trouver l' email

        if (!user) res.status(500).json({message: "Utilisateur introuvable"}); // user innexistant
        
        if(!email || !password) res.status(500).json({message:"les champs sont requis"}); //verification champ vide

        if(user.isLoggedIn == true) res.status(500).json({message: "vous etes déja connecter"})




        const connected =  await loginService(req.body)
        return success(res, connected, "vous etes connecter", 200);
  
};

const logOut = async (req,res)=>{
        try {
                const userId = req.user.id // recupere depuis middleware

                await logoutService(userId)
                res.status(200).json({message: "Deconnexion reussi"})

        } catch (error) {
                throw new Error(error.message)
        }
}
module.exports = {login, logOut}