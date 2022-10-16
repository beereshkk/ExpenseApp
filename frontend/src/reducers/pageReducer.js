const initialState={num:1}

const pageReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'PAGE_NUM':{
            return {num:action.payload}
        }
         default:{
            return state
        }
    }
}

export default pageReducer