const mongoose=require('mongoose')
const Schema=mongoose.Schema
const validator=require('validator')
const budgetSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:String,
        validate:{
            validator:function(value){
                console.log(typeof value)
                return validator.isNumeric(value)
            },
            message:function(){
                return 'Please enter only numbers'
            }
        }
    }

},{timestamps:true})

const Budget=mongoose.model('Budget',budgetSchema)

module.exports=Budget