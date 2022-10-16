import axios from 'axios'
import { getExpenses } from './ExpenseAction'

export const startCreateCategory=(category,token)=>{
    return (dispatch)=>{
        axios.post('http://localhost:3050/api/categories',category,{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                const categoryData=res.data
                
                console.log('inserted category',categoryData)
                dispatch(createCategory(categoryData))
            })
    }
}

const createCategory=(categoryData)=>{
    return {
        type:'CREATE_CATEGORY',
        payload:categoryData
    }
}

export const startGetCategories=(token)=>{
    return (dispatch)=>{
        axios.get('http://localhost:3050/api/categories',{headers:{
            Authorization:token.token
        }})
            .then((res)=>{
                console.log('all received categories on reload',res.data)
                const categories=res.data
                dispatch(getCategories(categories))
            })
    }
}

const getCategories=(categories)=>{
    return {
        type:'GET_CATEGORIES',
        payload:categories
    }
}

export const startEditCategory=(editedCategory,id,token,changeToggle)=>{
    return(dispatch)=>{
        console.log('to be edited category',editedCategory.name)
        axios.put(`http://localhost:3050/api/categories/${id}`,editedCategory,
        {headers:{
            Authorization:token.token
        }})
        .then((res)=>{
            
            const category=res.data
            if(category.hasOwnProperty('name')){
                console.log('after db edit',category)
                dispatch(editCategory(category))
                changeToggle()
            }
        })
    }
}

const editCategory=(category)=>{
    return {
        type:'EDIT_CATEGORY',
        payload:category
    }
}

export const startDeleteCategory=(id,token)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:3050/api/categories/${id}`,{
            headers:{
                Authorization:token.token
            }
        })
        .then((res)=>{
            const category=res.data.category
            const expenses=res.data.expenses
            console.log('deleted category',category,expenses)
            dispatch(deleteCategory(category))
            dispatch(getExpenses(expenses))
        })
    }
}

const deleteCategory=(category)=>{
    return {
        type:'DELETE_CATEGORY',
        payload:category
    }
}

export const clearCategories=()=>{
    return {
        type:'CLEAR_CATEGORIES',
        
    }
}