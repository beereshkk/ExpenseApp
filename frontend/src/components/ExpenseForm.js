import React,{useState} from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { startAddExpense,startEditExpense } from '../actions/ExpenseAction';
import swal from 'sweetalert'

const ExpenseForm=(props)=>{
    const {handleToggle,expense}=props
    const dispatch=useDispatch()
    const nonFilteredCategories=useSelector((state=>state.categories))
    const categories=useSelector((state=>state.categories)).filter(ele=>ele.name!=='uncategorized')
    const token=JSON.parse(localStorage.getItem('jwtToken'))
    const expenses=useSelector(state=>state.expenses)
    const budget=useSelector(state=>state.budget)
    const [show, setShow] = useState(true);
    const [errMess,setErrMess]=useState(false)
    const [name,setName]=useState(expense?expense.name:'')
    const [amount,setAmount]=useState(expense?expense.amount:'')
    const [date,setDate]=useState(expense?expense.date.slice(0,10):'')
    let expensesAmount=0
    const  now = new Date()
    const maxDate = now.toISOString().substring(0,10);

    let res
    if(expense){
        
        res=categories.find((category)=>{
    
            return category._id==expense.categoryId})
            console.log('res',res)
    }
    console.log(res)
    const [category,setCategory]=useState(res?res._id:'select category')
    
    const clearInput=()=>{
        setName('')
        setAmount('')
        setDate('')
        setCategory('select category')
        setShow(false);
        handleToggle()
    }

    const handleSubmit = () => {
        expenses.forEach((expense)=>{
            expensesAmount+=+expense.amount
        })
        if(Number(expensesAmount)+Number(amount)>Number(budget.amount)){
            swal("New insertion failed", "Your expenses will go above the budget on addition of this expense. Hence cannot be added", "error");
        }
        else{
            if(name==''||amount==''||date==''||category=='select category'){
                setErrMess(true)
                const expenseData={name,amount,date,categoryId:category}
                console.log(expenseData)
                
            }
            else{
                
                setErrMess(false)
                console.log({name,amount,date,category}) 
                const expenseData={name,amount,date,categoryId:category}
                
                console.log('expense data',expenseData)
                expense?dispatch(startEditExpense(expense._id,expenseData,token,handleToggle)):dispatch(startAddExpense(expenseData,token,clearInput))
    
            }
        }

        
       
    }

    
    const handleClose = () => {
        
        setShow(false);
        handleToggle()
    }


    const handleChange=(e)=>{
        
            setCategory(e.target.value)
        
        
    }
    return (
        <>
        
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard="False" id='modal'>
            <Modal.Header >
            <Modal.Title>{expense?'Edit Expense':'Add an Expense'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <center>
            <form >
                    
                 <label className='form-label'>Enter name</label>
                 <input className='form-control' type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}/><br />

                 <label className='form-label'>Enter Amount</label>
                 <input className='form-control' type='text' placeholder='Enter Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/><br />

                 <label className='form-label'>Enter Date</label>
                 <input className='form-control' type='date' max={maxDate} value={date} onChange={(e)=>setDate(e.target.value)}/><br />
                    
                  <select className='form-select' value={category} onChange={handleChange}>
                        {!expense&&<option value='select category'>Choose Category</option>}
                        {(expense?nonFilteredCategories:categories).map((category)=>{
                            return <option value={category._id} key={category._id}>{category.name}</option>
                        })}
                  </select>
                  
                </form>
                </center> 

               { errMess&&<p style={{color:'red'}}>None of the fields can be empty. Please fill all the fields</p>}
            </Modal.Body>
        
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit} >
                {expense?'Save Changes':'Add'}
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ExpenseForm