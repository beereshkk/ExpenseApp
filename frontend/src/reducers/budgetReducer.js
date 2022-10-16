const initialState={}

const budgetReducer=(state=initialState,action)=>{
    switch(action.type){
        default:{
            return state
        }
        case 'CREATE_BUDGET':{
            return {...action.payload}
        }
        case 'GET_BUDGET':{
            return {...action.payload} 
        }
        case 'CLEAR_BUDGET':{
            return {}
        }
    }
}

export default budgetReducer