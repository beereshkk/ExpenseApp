import axios from 'axios'
import { clearBudget,startGetBudget } from './budgetAction'
import { clearCategories,startGetCategories } from './categoriesAction'
import { clearExpenses,startGetExpenses } from './ExpenseAction'
import { startGetAllDeletedExpenses,clearDeletedExpenses } from './deletedExpensesAction';


export const startLogin=(loginData,clearInput,redirect,setFormIssues)=>{
    return (dispatch)=>{
        axios.post('http://localhost:3050/api/login',loginData)
            .then((res)=>{
                console.log(res.data)
                 if(res.data.hasOwnProperty('token')){
                    console.log('jwtToken',res.data)
                    localStorage.setItem('jwtToken',JSON.stringify(res.data))
                    dispatch(loginUser(res.data))
                    dispatch(startGetCategories(res.data))
                    dispatch(startGetExpenses(res.data))
                    dispatch(startGetAllDeletedExpenses(res.data))
                    //dispatch(startGetUser())
                    dispatch(startGetBudget(res.data)) 

                    clearInput()
                    redirect()
                }
                else {
                    console.log('not found')
                    setFormIssues()
                    dispatch(loginErrors(res.data))
                } 

            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}

const loginUser=(jwtToken)=>{
    console.log('inside action',jwtToken)
    return {
        type:'USER_LOGIN',
        payload:jwtToken
    }
}

export const startlogout=()=>{
    return(dispatch)=>{
        localStorage.removeItem('jwtToken')
        dispatch(userlogout())
        dispatch(clearBudget())
        dispatch(clearExpenses())
        dispatch(clearCategories())
        dispatch(clearDeletedExpenses())
    }
}

const userlogout=()=>{
    return {
        type:'USER_LOGOUT'
    }
}

export const startGetUser=()=>{
    return(dispatch)=>{
       const token= JSON.parse(localStorage.getItem('jwtToken'))
        if(token){
            dispatch(getUser(token))
        }
    }
}

const getUser=(token)=>{
    return {
        type:'GET_USER',
        payload:token
    }
}
const loginErrors=(errors)=>{
    return {
        type:'LOGIN_ERRORS',
        payload:errors
    }
}