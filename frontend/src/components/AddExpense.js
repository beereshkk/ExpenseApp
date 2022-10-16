import React,{useState} from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { startAddExpense } from '../actions/ExpenseAction';
import ExpenseForm from './ExpenseForm';
const AddExpense=(props)=>{
    console.log('inside AddExpense ')
    const dispatch=useDispatch()
    const token=JSON.parse(localStorage.getItem('jwtToken'))
    const [show, setShow] = useState(false);
    const [errMess,setErrMess]=useState(false)
    const [name,setName]=useState('')
    const [amount,setAmount]=useState('')
    const [date,setDate]=useState('')
    const [category,setCategory]=useState('select category')
    const categories=useSelector(state=>state.categories).filter((category)=>category.name!=='uncategorized')
    const [toggle,setToggle]=useState(false)
    const clearInput=()=>{
        setName('')
        setAmount('')
        setDate('')
        setCategory('select category')
        setShow(false);
    }

    const handleSubmit = () => {
        if(name==''||amount==''||date==''||category=='select category'){
            setErrMess(true)
            const expenseData={name,amount,date,categoryId:category}
            console.log(expenseData)
            
        }
        else{
            
            setErrMess(false)
            console.log({name,amount,date,category}) 
            const expenseData={name,amount,date,categoryId:category}
            
            console.log('token in add expense',token)
            dispatch(startAddExpense(expenseData,token,clearInput))
        }
       
    }


    const handleToggle=()=>{
        setToggle(!toggle)
    }
    return (
        <>
        <Button className="nextButton addExpenseBtn" onClick={handleToggle}>
            Add Expense
        </Button>
        {toggle&&<ExpenseForm  handleToggle={handleToggle}/>}

        </>
    )
}

export default AddExpense