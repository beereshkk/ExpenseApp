const initialState=[]

const deletedExpensesReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_DELETED_EXPENSES':{
            return [...action.payload]
        }
        case 'CLEAR_DELETED_EXPENSES':{
            return []
        }
        case 'ADD_DELETED_EXPENSE':{
            return [...state,action.payload]
        }
        case 'UNDO_DELETED_EXPENSE':{
            const newState= state.filter((deletedExpense)=>{
                return deletedExpense._id!==action.payload._id
                  
            })
            return newState
        }
        default:{
            return state
        }
        
    }
}

export default deletedExpensesReducer