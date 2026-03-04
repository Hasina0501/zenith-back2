const {getUser, createUser} = require("../services/user.service")

const getUsers = async (req, res)=>{
    const user = await getUser()
    return res.status(200).json({
        user: user
    })
}
const createUsers =async (req,res)=>{
    const {name, email, password, role} = req.body //les donnée duis le front

    
    if(!name || !email || !password) throw new Error("veuillez remplir les champs") //gestion d'erreur
        
        // gestion erreur Enum role
        if(role){
            if(role != "Admin" && role != "admin" && role != "Super_Admin" && role != "super_admin"){
                throw new Error("role invalid")
            }
        }
        
    const newUser = await createUser(req.body) //appelle la fonction dans service
    //renvoyer les données
    return res.status(201).json({
        message: "user creer avec succes",
        data: newUser
    })
}
module.exports = {getUsers, createUsers}