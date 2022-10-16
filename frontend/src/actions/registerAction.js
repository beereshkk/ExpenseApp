
import axios from 'axios'

export const startRegister=(registerData,clearInput,redirect)=>{
    console.log('hi')
    return(dispatch)=>{
        console.log('yo')
        axios.post('http://localhost:3050/api/register',registerData)
        .then((res)=>{
            
            clearInput()
            redirect()
            })
        .catch((err)=>{
            alert(err.message)
        })
    }
}
