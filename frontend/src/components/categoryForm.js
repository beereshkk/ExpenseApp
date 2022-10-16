import React,{useState} from "react";
import { startCreateCategory } from '../actions/categoriesAction'
import {useDispatch} from 'react-redux'
import { startEditCategory } from "../actions/categoriesAction";
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryForm=(props)=>{
    const {formSubmitted}=props
    const err={}
    const [errors,setErrors]=useState({})
    console.log('inside CategoryForm ')
    const {editCategory,handleToggle}=props
    const dispatch=useDispatch()
    const [category,setCategory]=useState(editCategory?editCategory.name:'')
    const token=JSON.parse(localStorage.getItem('jwtToken'))
    
    const handleChange=(e)=>{
        const val=e.target.value
        setCategory(val)
    }
    const changeToggle=()=>{
        //setToggle(!toggle)
        handleToggle()

    }
    const runValidators=()=>{
        if(category.length==0){
            err.categoryError=editCategory?'Cannot update an empty category':'Cannot add an empty category'
        }
    }
    const handleCategorySubmit=(e)=>{
        
        e.preventDefault()
        runValidators()
        if(Object.keys(err).length==0){
            
            setErrors({})
            const categoryData={name:category}
        
            editCategory?dispatch(startEditCategory({name:category},editCategory._id,token,changeToggle)):dispatch(startCreateCategory(categoryData,token))
        }
        else {
            setErrors(err)
        }
    }

    return (
        <>
        {editCategory?<h2 style={{color:'orange'}}>Edit category</h2>:<h2>Add a category:</h2>}
             <form onSubmit={handleCategorySubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <input type='text' className='form-control' value={category} name={editCategory?'editCategory':'category'} onChange={handleChange} placeholder='Enter a category'/>
                        <br />
                        {errors&&<p style={{color:'red'}}>{errors.categoryError}</p>}
                    </div>
                    <div className="col-md-3">
                         <input type='submit' className='btn btn-success categoryBtn' value={editCategory?'Update':'Add'}  />
                         
                    </div>
                    
                </div>
            </form>
        </>
    )
}

export default CategoryForm