const User=require('../model/userModel')
const Category=require('../model/categoryModel')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userController={}

userController.showUser=(req,res)=>{
    User.find()
        .then((users)=>{
            res.json(users)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

userController.createUser=(req,res)=>{
    
    const email=req.email
    const encryptedPassword=req.encryptedPassword
    const user=new User({email,password:encryptedPassword})
    user.save()
    .then((user)=>{
        const category=new Category({name:'uncategorized',userId:user._id})
        category.save()
        
            .then((category)=>{
                res.json(user)
            })
            .catch((err)=>{
                res.json(err.message)
            })
    })
    .catch((err)=>{
        res.json(err.message)
    })
 
}

userController.updateUser=(req,res)=>{
    const id=req.params.id
    const body=req.body
    User.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err.message)
        })

}

userController.removeUser=(req,res)=>{
    const id=req.params.id
    User.findByIdAndDelete(id)
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

userController.login=(req,res)=>{
    const body=req.body
    console.log('body',body)
    User.findOne({email:body.email})
        .then((user)=>{
            console.log('Found user with email',user)
            if(user){
                bcryptjs.compare(body.password,user.password)
                    .then((match)=>{
                        if(match){
                            const tokenData={
                                _id:user._id,
                                email:user.email
                            }
                            const token=jwt.sign(tokenData,'abc123',{expiresIn:'3d'})
                            res.json({
                                token
                            })
                        }
                        else {
                            res.json({errors:'Invalid Email or password'})
                        }
                    })
            }
            else {
                res.json({errors:'Invalid email or password'})
            }
        })
}

userController.uploadPic=(req,res)=>{
    const user=req.user
    console.log(req.file)
    User.findOneAndUpdate({_id:user._id},{picture:req.file.path},{new:true,runValidators:true})
        .then((result)=>{
            console.log(result)
            res.json({profilePic:result.picture})
        })
    
}

module.exports=userController