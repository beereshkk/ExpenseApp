const Expense=require('../model/expenseModel')

const expenseController={}
expenseController.list=(req,res)=>{
    const user=req.user
    Expense.find({userId:user._id})
        .then((expenses)=>{
            console.log('expenses',expenses)
            res.json(expenses)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseController.show=(req,res)=>{
    const user=req.user
    const id=req.params.id
    Expense.findOne({userId:user._id,_id:id})
        .then((expenses)=>{
            res.json(expenses)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseController.create=(req,res)=>{
    const user=req.user
    const body=req.body
    const expense=new Expense({
        name:body.name,
        amount:body.amount,
        categoryId:body.categoryId,
        userId:user._id,    
        date:body.date
    })
    expense.save()
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseController.remove=(req,res)=>{
    const user=req.user
    const id=req.params.id
    Expense.softDelete({userId:user._id,_id:id})
        .then((expense)=>{
            console.log('after delete expenses',expense)
            Expense.findById({userId:user._id,_id:id})
                .then((deletedItems)=>{
                    res.json({expense,deletedItems})
                })
                .catch((err)=>{
                    res.json(err.message)
                })
            
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseController.update=(req,res)=>{
    const id=req.params.id
    const user=req.user
    const body=req.body
    Expense.findOneAndUpdate({userId:user._id,_id:id},body,{new:true,runValidators:true})
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseController.undo=(req,res)=>{
    const user=req.user
    const id=req.params.id
    Expense.restore({userId:user._id,_id:id})
        .then((restoreCount)=>{
            Expense.find({userId:user._id,_id:id})
                .then((expense)=>{
                    res.json({restoreCount,expense})
                })
                .catch((err)=>{
                    res.json(err.message)
                })
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseController.deletedExpenses=(req,res)=>{
    const receivedUser=req.user._id
    console.log('user',receivedUser)
    Expense.findDeleted({userId:receivedUser})
         .then((deletedExpenses)=>{
           const result=deletedExpenses.filter((expense)=>{
            return String(expense.userId)===String(receivedUser)
           })
            console.log('deleted Expenses',result)
            res.json(result)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}
module.exports=expenseController
