const adminService = require('../services/admin.service')
const asyncHandler = require("../utils/asyncHandler")

const getAdmin = asyncHandler(async (req, res) => {
    const admin = await adminService.getAdmin()
    res.json(admin)
})

module.exports = {
    getAdmin
}