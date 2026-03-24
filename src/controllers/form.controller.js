const {createFrom, updateForm, getAllForm, deleteForm, getFormActive, activeForm} = require('../services/form.service')

// Toute les formulaires disponible
const getForm = async (req,res)=>{
    try {
        await getAllForm()
        return res.status(200).json({message: "liste des formulaire"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//toute les formulaire active
const getActive = async (req,res)=>{
    try {
        await getFormActive()
        return res.status(200).json({message: "les formulaire active"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// creer une formulaire
const create = async (req,res)=>{
   try {
        const {name} = req.body

        if(!name) res.status(400).json({message: "veuillez remplir les champs"})
        
        const form = await createFrom(req.body)

        return res.status(200).json({message: "formulaire creer avec succés",data: form})
   } catch (error) {
        return res.status(500).json({error: error.message})
   }
}

// mise à jour d' un formulaire
const update = async (req,res)=>{
    try {
        const {newName} = req.body

        const formId = req.params.id
        if(!newName) res.status(500).json({message: "les champs sont requis"})

        await updateForm(formId, req.body)
        return res.status(200).json({message: "mise à jour éffectuer"})

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// activer une formulaire
const active = async (req,res)=>{
    try {
        const formId = req.params.id

        await activeForm(Number(formId))

        return res.status(200).json({message: "formulaire activer"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// suppression d' un formulaire 
const delForm = async (req,res)=>{
    try {
        const formId = parseInt(req.params.id)
        await deleteForm(formId)

        return res.status(500).json({message: "formulaire supprimer"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {getForm, getActive, create, update, active, delForm}