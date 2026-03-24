const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const createFrom = async (payload)=>{
    const {name} = payload

    return await prisma.Form.create({
        data:{name: name}
    })
}

const getAllForm = async ()=>{
    const form = await prisma.Form.findMany()

    return form
}

const getFormActive = async ()=>{
    const form = await prisma.Form.findMany({
        where: { active: true }
    })

    return form
}

const updateForm = async (formId,payload)=>{
    const {newName} = payload

    return await prisma.Form.update({
        where: {id: formId},
        data: {name: newName}
    })
}

const activeForm = async (formId)=>{
    return await prisma.Form.update({
        where: {id: formId},
        data: {active: true}
    })
}
const deleteForm = async (formId)=>{
    return await prisma.Form.delete({
        where: {id: formId}
    })
}


module.exports = {createFrom, updateForm, getAllForm, getFormActive, deleteForm, activeForm}