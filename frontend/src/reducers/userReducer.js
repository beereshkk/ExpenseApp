const initialState={}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_PROFILE_PICTURE':{
            return {...action.payload}
        }
        default:{
            return state
        }
    }
}

export default userReducer