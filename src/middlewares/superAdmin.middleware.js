const Super_Admin = (req,res,next)=>{

    if(req.user.role !== "Super_Admin" && req.user.role !== "super_admin"){
        return res.status(403).json({
            message: "Accés réservé au super Admin"
        })
    }
    next()
}

module.exports = Super_Admin