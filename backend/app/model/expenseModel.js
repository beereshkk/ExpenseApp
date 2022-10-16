const mongoose=require('mongoose')
const Schema=mongoose.Schema
const {softDeletePlugin}=require('soft-delete-plugin-mongoose')
const validator=require('validator')
const expenseSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            message:function(){
                return 'Amount must be numeric'
            }
        }
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
expenseSchema.plugin(softDeletePlugin)
const Expense=mongoose.model('Expense',expenseSchema)

module.exports=Expense
