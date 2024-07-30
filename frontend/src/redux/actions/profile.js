import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const updateprofile =(name,email) =>async(dispatch)=>{
try{
dispatch({type:'updateprofileRequest'})
const {data} = await axios.put(`https://coursebundler-1-788d.onrender.com/api/v1/user/updateprofile`,{name,email},{
headers:{
    "Content-Type": "application/json"
},
    withCredentials:true

})

dispatch({type:'updateprofileSuccess',payload:data.user})
console.log(data)
toast.success(data.message)
}catch(error){
dispatch({type:'updateprofileFailure',payload:error.message})
toast.error(error.response.data.message)
}

}
export const changepassword = (oldPassword,newPassword) =>async(dispatch)=>{
    try{
        dispatch({type:'changePasswordRequest'})
        const {data} = await axios.put(`https://coursebundler-1-788d.onrender.com/api/v1/user/changepassword`,{oldPassword,newPassword},{
            headers:{
                "Content-Type": "application/json"
            },
                withCredentials:true
        })
        dispatch({type:'changePasswordSuccess',payload:data.user})
        toast.success(data.message)
        console.log(data)
        

    }catch(error){
        console.log(error)
        dispatch({type:'changePasswordFailure',payload:error.message})
        toast.error(error.response.data.message)
    }

}
export const profilepicture = (formdata) =>async(dispatch)=>{
    try{
        dispatch({type:'updatepictureRequest'})
        const {data} = await axios.put(`https://coursebundler-1-788d.onrender.com/api/v1/user/profilepicture`,formdata,{
            headers:{
                "Content-Type": "multipart/form-data"
            },
                withCredentials:true
        })
        dispatch({type:'updatepictureSuccess',payload:data.user})
        toast.success(data.message)
        console.log(data)

    }catch(error){
        console.log(error)
        dispatch({type:'updatepictureFailure',payload:error.message})
        toast.error(error.response.data.message)
    }
}
export const forgetpassword = (email) =>async(dispatch)=>{
    try{
        dispatch({type:'forgetpasswordRequest'})
        const {data} = await axios.post(`https://coursebundler-1-788d.onrender.com/api/v1/user/forgotpassword`,{email},{
            headers:{
                "Content-Type": "application/json"
            },
                withCredentials:true
        })
        dispatch({type:'forgetpasswordSuccess',payload:data.message})
        toast.success(data.message)
        console.log(data)

    }catch(error){
        console.log(error)
        dispatch({type:'forgetpasswordFailure',payload:error.message})
        toast.error(error.response.data.message)
    }
}
export const resetpassword = (token,password) =>async(dispatch)=>{
    const navigate = useNavigate()
    try{
        dispatch({type:'resetpasswordRequest'})
        const {data} = await axios.put(`https://coursebundler-1-788d.onrender.com/api/v1/user/resetpassword/${token}`,{password},{
            headers:{
                "Content-Type": "application/json"
            },
                withCredentials:true
        })
        dispatch({type:'resetpasswordSuccess',payload:data.message})
        toast.success(data.message)
        console.log(data)
        navigate('/login')

    }catch(error){
        console.log(error)
        dispatch({type:'resetpasswordFailure',payload:error.message})
        toast.error(error.response.data.message)
    }
}

export const removefromPlaylist = (id) => async(dispatch) => {
    try{
        dispatch({type:"removeFromPlaylistRequest"})
        const {data} = await axios.delete(`https://coursebundler-1-788d.onrender.com/api/v1/user/removeplaylist?id=${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        dispatch({type:"removeFromPlaylistSuccess",payload:data.message})
        console.log(data)
        toast.success(data.message)
    }catch(error){
        dispatch({type:"removeFromPlaylistFail",payload:error.response.data.message})
        toast.error(error.response.data.message)
    }
}
