const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getUser = async ()=>{
    const user = await prisma.User.findMany()  // trouver toute les user
    return user
}

const createUser = async (payload)=>{
    const {name, email, password, role} = payload // les donnée utlis

    const password_hasher = await bcrypt.hash(password, 10) // crypter le password

    return await prisma.User.create({
        data: {
            name: name,
            email: email,
            password: password_hasher,
            role: role
        }
    })
}

module.exports = {getUser, createUser}