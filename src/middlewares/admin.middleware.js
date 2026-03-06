const adminMiddleware = (req,res,next)=>{

    if(req.user.role !== "Admin" && req.user.role !== "admin"){
        return res.status(403).json({
            message: "Accés réservé aux admins"
        })
    }
    next()
}

module.exports = adminMiddleware