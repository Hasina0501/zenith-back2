const { PrismaClient } = require('@prisma/client')
const { date } = require('joi')
const prisma = new PrismaClient()

const createField = async (formId, payload)=>{
    const { label, type, required } = payload

    return await prisma.FormField.create({
        data:{
            label: label,
            type: type,
            required: required,
            formId: formId
        }
    })
}

const getAllField = async (formId)=>{
    return await prisma.FormField.findMany({
        where: {FormId: formId}
    })
}

const updateField = async (fieldId,newPayload)=>{
    const {newLabel, newType, required, newFormId} = newPayload

    return await prisma.FormField.update({
        where: {id: fieldId},
        data: {
            label: newLabel,
            type: newType,
            required: required,
            formId: newFormId
        }
    })
}

const deleteField = async (fieldId)=>{
    return await prisma.FormField.delete({
        where: {id: formId}
    })
}


module.exports = {createField, getAllField, updateField, deleteField}
