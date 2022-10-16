const updateExpenses=(req,res,next)=>{
    const Expense=require('../model/expenseModel')
    const Category=require('../model/categoryModel')

    const uncategorized=req.uncategorized
    const categoryId=req.params.id
    const user=req.user
    console.log(categoryId,uncategorized)
     Category.findById(categoryId)
        .then((category)=>{
            if(category.name==='uncategorized'){
                res.json('Cannot delete the default category')
            }
            else {
                Expense.updateMany({categoryId:categoryId},{$set:{categoryId:uncategorized._id}})
                .then((ack)=>{
                    console.log('ack',ack)
                     Expense.find({userId:user._id})
                        .then((expenses)=>{
                            //res.json(expenses)
                            req.expenses=expenses
                            
                            next()
                        })
                        .catch((err)=>{
                            res.json(err.message)
                        }) 
                    
                })
                .catch((err)=>{
                    res.json(err.message)
                })
            }
        })
        .catch((err)=>{
            res.json(err.message)
        })
     

}

module.exports=updateExpenses