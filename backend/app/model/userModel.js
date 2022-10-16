const mongoose=require('mongoose')
const Schema=mongoose.Schema
const validator=require('validator')
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'Invalid Email format'
            }
        }
    },
    password:{
        type:String,
        minlength:[5,'Password length must be greater than 4'],
        
        required:true
    },
    picture:{
        type:String
    }
})

const User=mongoose.model('User',userSchema)

module.exports=User