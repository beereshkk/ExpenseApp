const Budget=require('../model/budgetModel')

const budgetController={}

budgetController.show=(req,res)=>{
    const user=req.user
    Budget.findOne({userId:user._id})
        .then((budget)=>{
            console.log('show budg',budget)
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

budgetController.update=(req,res)=>{
    const id=req.params.id
    const user=req.user
    const body=req.body
    Budget.findOneAndUpdate({userId:user._id,_id:id},body,{new:true,runValidators:true})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

budgetController.create=(req,res)=>{
    const body=req.body
    const user=req.user
    const budget=new Budget({userId:user._id,amount:body.amount})
    budget.save()
        .then((budg)=>{
            console.log('budg',budg)
            res.json(budg)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

budgetController.remove=(req,res)=>{
    
    Budget.remove({})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

module.exports=budgetController