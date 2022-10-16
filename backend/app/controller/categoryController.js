const Category=require('../model/categoryModel')

const categoryController={}

categoryController.show=(req,res)=>{
    const user=req.user
    
    Category.find({userId:user._id})
        .then((categories)=>{
            res.json(categories)
        })
        .catch((err)=>{
            res.json(err)
        })
}
categoryController.list=(req,res)=>{
    const user=req.user
    const id=req.params.id
    Category.findOne({userId:user._id,_id:id})
        .then((categories)=>{
            res.json(categories)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoryController.create=(req,res)=>{
    const body=req.body
    const user=req.user
    const category=new Category({name:body.name,userId:user._id})
    category.save()
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })

}

categoryController.update=(req,res)=>{
    const user=req.user
    const id=req.params.id
    const body=req.body
    Category.findOneAndUpdate({userId:user._id,_id:id},body,{new:true,runValidators:true})
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })

}

categoryController.remove=(req,res)=>{
     const expenses=req.expenses
     const user=req.user
     const id=req.params.id   
    Category.findOneAndDelete({userId:user._id,_id:id})
        .then((category)=>{
            res.json({category,expenses})
        })
        .catch((err)=>{
            res.json(err)
        }) 
}

module.exports=categoryController