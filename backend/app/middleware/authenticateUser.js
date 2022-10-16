const User=require('../model/userModel')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const authenticateUser=(req,res,next)=>{
    const token=req.header('Authorization')
    console.log('In authenticate middleware')
    let tokenData
    try{
        tokenData=jwt.verify(token,'abc123')
        User.findById(tokenData._id)
            .then((user)=>{
                console.log('found user',user)
                req.user=user
                next()
            })
            .catch((err)=>{
                res.json(err.message)
            })
    }
    catch(e){
        res.json(e.message)
    }
}

module.exports=authenticateUser