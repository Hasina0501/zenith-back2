const prisma = require('../config/prisma')

const getAdmin = async ()=>{
    return await prisma.Admin.findMany()
}

module.exports = getAdmin