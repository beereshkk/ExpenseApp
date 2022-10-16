
const express=require('express')
const app=express()

const mongoose=require('mongoose')
const configureDb=()=>{
    
    mongoose.connect('mongodb://localhost:27017/expense-app')
        .then(()=>{
            console.log('successfully connected to DB')
        })
        .catch((err)=>{
            console.log(err.message)
        })
}

module.exports=configureDb