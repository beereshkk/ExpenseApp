import axios from 'axios'
import { createDeletedExpense } from './deletedExpensesAction'
export const startGetExpenses=(token)=>{
    return (dispatch)=>{
        axios.get('http://localhost:3050/api/expenses',{headers:{
            Authorization:token.token
        }})
            .then((res)=>{
                const expenses=res.data
                
                dispatch(getExpenses(expenses))
            })
    }
}

export const getExpenses=(expenses)=>{
    return {
        type:'GET_EXPENSES',
        payload:expenses
    }
}


export const startAddExpense=(expense,token,clearInput)=>{

    return (dispatch)=>{
        axios.post('http://localhost:3050/api/expenses',expense,{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                const expense=res.data
                console.log('added expense',expense)
                dispatch(addExpense(expense))
                clearInput()
            })
    }
}

const addExpense=(expense)=>{
        return {
            type:'ADD_EXPENSE',
            payload:expense
        }
}

export const startEditExpense=(id,expense,token,handleToggle)=>{
    return (dispatch)=>{
        axios.put(`http://localhost:3050/api/expenses/${id}`,expense,{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                const expense=res.data
                if(expense.hasOwnProperty('name')){

                    dispatch(editExpense(expense))
                    handleToggle()
                }
                
            })
    }
}


export const editExpense=(expense)=>{
    return {
        type:'EDIT_EXPENSE',
        payload:expense
    }
}

export const startDeleteExpense=(id,token)=>{
    return (dispatch)=>{
        axios.delete(`http://localhost:3050/api/expenses/${id}`,{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                const expense=res.data
                console.log('deleted expense',expense)
                dispatch(deleteExpense(expense.deletedItems))
                dispatch(createDeletedExpense(expense.deletedItems))
            })
    }
}

const deleteExpense=(expense)=>{
    return {
        type:'DELETE_EXPENSE',
        payload:expense
    }
}

export const undoExpenseDelete=(expense)=>{
    return {
        type:'UNDO_EXPENSE_DELETE',
        payload:expense
    }
}

export const clearExpenses=()=>{
    return {
        type:'CLEAR_EXPENSES'
    }
}

