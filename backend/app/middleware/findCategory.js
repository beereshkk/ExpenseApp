

const findCategory=(req,res,next)=>{
    const Category=require('../model/categoryModel')
    
    const userId=req.user._id

    Category.findOne({name:'uncategorized',userId:userId})
        .then((category)=>{
            //res.json(category)
            req.uncategorized=category
            next()

        })
        .catch((err)=>{
            res.json(err.message)
        })

}

module.exports=findCategory