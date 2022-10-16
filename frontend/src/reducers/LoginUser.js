 const initialState={}

const LoginReducer=(state=initialState,action)=>{
    console.log('inside reducer',action.payload)
    switch(action.type){
        case 'USER_LOGIN':{
            return {...action.payload}
        }
        default:{
            return state
        }
        case 'USER_LOGOUT':{
            return {}
        }
        case 'GET_USER':{
            return {...action.payload}
        }
        case 'LOGIN_ERRORS':{
            return {...action.payload}
        }
    }
}

export default LoginReducer 