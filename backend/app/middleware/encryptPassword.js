const encryptPassword=(req,res,next)=>{
    const bcryptjs=require('bcryptjs')
    const password=req.body.password
    
    bcryptjs.genSalt()
        .then((salt)=>{
            bcryptjs.hash(password,salt)
                .then((encrypted)=>{
                    req.email=req.body.email
                    req.encryptedPassword=encrypted
                    next()
                })
        })
    
}


module.exports=encryptPassword