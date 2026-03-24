const {createField, getAllField, updateField, deleteField} = require("../services/formField.service")

const create = async (req,res)=>{
    try {
        const {label, type, required} = req.body
        const formId = req.params.formId

        if(!label || !type){
            res.status(400).json({message: "les champs sont requies"})
        }

        const field = await createField(formId,req.body)
        return res.status(200).json({message: "champ créer avec succés", data: field})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}

const get = async (req,res)=>{
    const formId = req.params.id
    const data = await getAllField(formId)

    return res.status(200).json({data: data})
}


const update = async (req,res)=>{
    try {
        const {newLabel, newType, required, newFormId} = req.body
        const fieldId = req.params.id

        if(!newLabel || !newType || !required || !newFormId){
            res.status(400).json({message: "les champs sont requies"})
        }
        
        const newField = await updateField(fieldId,req.body)
        return res.status(200).json({message: "mise à jour éfféctuer", data: newField})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}

const delField = async (req,res)=>{
    try {
        const fieldId = req.params.id
        await deleteField(fieldId)
        return res.status(200).json({message: "champ supprimer"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = {create, update, get, delField}