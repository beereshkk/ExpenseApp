import axios from 'axios'

export const startAddProfilePicture=(data,token)=>{
    return (dispatch)=>{
        axios.put('http://localhost:3050/api/user/pic',data,{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                console.log('user pic location',res.data)
                dispatch(addPicture(res.data))
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

const addPicture=(pic)=>{
    return {
        type:'ADD_PROFILE_PICTURE',
        payload:pic
    }
}