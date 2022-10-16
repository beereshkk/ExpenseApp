import React,{useState} from 'react'
import '../App.css';
import { useSelector,useDispatch } from 'react-redux';
import "bootstrap-icons/font/bootstrap-icons.css";
import ExpenseForm from './ExpenseForm';
import { startDeleteExpense } from '../actions/ExpenseAction';
import { startUndoDelete } from '../actions/deletedExpensesAction';
import swal from 'sweetalert'

const ExpenseItem=(props)=>{
    const {expense}=props
   
    const dispatch=useDispatch()
    const expenses=useSelector(state=>state.expenses)
    const categories=useSelector(state=>state.categories)
    const budget=useSelector(state=>state.budget)
    const [toggle,setToggle]=useState(false)
    
    const token=JSON.parse(localStorage.getItem('jwtToken'))
    const getCategory=(id)=>{
        const cat=categories.find((category)=>{
            return category._id===expense.categoryId
        })
       
        return cat.name
        
    }
    const handleToggle=()=>{
        setToggle(!toggle)
    }

    const handleDelete=()=>{
        console.log('to be deleted expense',expense._id,expense.name)
        dispatch(startDeleteExpense(expense._id,token))
    }

    const confirmUndo=()=>{
        let expensesAmount=0
        expenses.forEach((expense)=>{
            expensesAmount+=+expense.amount
            
        })
        const conf=window.confirm('Are you sure you want to undo the delete?')
        if(conf){
            
            const tot=(Number(expensesAmount)+Number(expense.amount))
            if(tot>Number(budget.amount)){
                
                swal("Undo failed", "Your expenses will go above the budget on addition of this expense. Hence cannot be added", "error");
            }
            else {
                dispatch(startUndoDelete(expense._id,token))
            }
        }
    }
    
    return (
        <>
            <td style={{color:getCategory(expense._id)=='uncategorized'?'red':'white', opacity:expense.isDeleted?'0.5':1}}>{getCategory(expense._id)}</td>
            <td style={{opacity:expense.isDeleted?'0.5':1}} >{expense.name}</td>
            <td  style={{opacity:expense.isDeleted?'0.5':1}}>{expense.amount}</td>
            <td  style={{opacity:expense.isDeleted?'0.5':1}}> {expense.date.slice(0,10)}</td>
            {!expense.isDeleted?(<td style={{border:'none'}}><i className="bi bi-pencil-square" onClick={handleToggle}></i></td>)
            :
            (<td style={{border:'none',textDecoration:'none'}}><i className="bi bi-arrow-counterclockwise" onClick={confirmUndo}></i></td>)
             }
            {!expense.isDeleted&&<td style={{border:'none'}}><i className="bi bi-trash" onClick={handleDelete}></i></td>}
            {toggle&&<ExpenseForm handleToggle={handleToggle} expense={expense}/>}
        </>
    )
}

export default React.memo(ExpenseItem)