import axios from 'axios'
import { undoExpenseDelete } from './ExpenseAction'

export const startGetAllDeletedExpenses=(token)=>{
    return (dispatch)=>{
        axios.get('http://localhost:3050/api/expenses/deleted',{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                const deletedExpenses=res.data
                console.log('deletedExpenses',deletedExpenses)
                dispatch(getAllDeletedExpenses(deletedExpenses))
            })
    }
}

const getAllDeletedExpenses=(deletedExpenses)=>{
    return {
        type:'GET_DELETED_EXPENSES',
        payload:deletedExpenses
    }
}

export const clearDeletedExpenses=()=>{
    return {
        type:'CLEAR_DELETED_EXPENSES',

    }
}

export const createDeletedExpense=(deletedExpense)=>{
    return {
    type:'ADD_DELETED_EXPENSE',
    payload:deletedExpense
    }
}

export const startUndoDelete=(id,token)=>{
    console.log('token in Undo Action',token)
    return(dispatch)=>{

        axios.put(`http://localhost:3050/api/expenses/undo/${id}`,{},{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                console.log('undo action',res.data)
                const undoExpense=res.data.expense[0]
                dispatch(undoExpenseDelete(undoExpense))
                dispatch(undoDelete(undoExpense))
                
                
            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}

const undoDelete=(undoExpense)=>{
    return {
        type:'UNDO_DELETED_EXPENSE',
        payload:undoExpense
    }
}