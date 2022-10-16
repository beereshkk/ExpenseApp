const initialState=[]

const expenseReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_EXPENSES':{
            return [...action.payload]
        }
        default:{
            return [...state]
        }
        case 'ADD_EXPENSE':{
            return [...state,action.payload]
        }
        case 'EDIT_EXPENSE':{
            console.log('editing expense')
            const newState=state.map((expense)=>{
                if(expense._id===action.payload._id){
                    return {...action.payload}
                }
                else {
                    return {...expense}
                }
            })
            return newState
        }

        case 'UNDO_EXPENSE_DELETE':{
            return [...state,action.payload]
        }
        case 'DELETE_EXPENSE':{
            const newState=state.filter((expense)=>{
                return expense._id!==action.payload._id
            })
            return newState
        }
        
        case 'CLEAR_EXPENSES':{
            return []
        }
    }
}

export default expenseReducer