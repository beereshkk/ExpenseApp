import axios from 'axios'


export const startCreateBudget=(budget,jwtToken,updateBudget)=>{
    return (dispatch)=>{
        axios.post('http://localhost:3050/api/budget',budget,{
            headers:{
                Authorization:jwtToken.token
            }
        })
        .then((budget)=>{
            dispatch(createBudget(budget.data))
            
            console.log('received budget on creating',budget.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

const createBudget=(amount)=>{
    return {
        type:'CREATE_BUDGET',
        payload:amount
    }
}

export const startGetBudget=(jwtToken)=>{
    console.log('jwt in header',jwtToken)
    return (dispatch)=>{
        axios.get('http://localhost:3050/api/budget',{headers:{
            Authorization:jwtToken.token
        }})
            .then((res)=>{
                console.log('received budget on reload',res.data)
                const budget=res.data
                dispatch(getBudget(budget))
            })
    }
}

const getBudget=(budget)=>{
    return {
        type:'GET_BUDGET',
        payload:budget
    }
}

export const clearBudget=()=>{
    return {
        type:'CLEAR_BUDGET',

    }
}