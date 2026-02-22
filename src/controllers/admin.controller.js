const adminService = require('../services/admin.service')

const getAdmin = async (req,res) => {
    try {
        const admin = await adminService.getAdmin()
        res.json(admin)
    } catch (error) {
        res.status(500).json({ 
            message : error.message
        })
    }
}

module.exports = getAdmin