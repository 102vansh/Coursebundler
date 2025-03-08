// import axios from 'axios';
// import toast from 'react-hot-toast';
// export const login = (email,password) => async(dispatch) => {
//     console.log(email,password)
//     try{
//         dispatch({type:'loginRequest'})
//         const {data} = await axios.post('http://localhost:3001/api/v1/user/login',{email,password},{
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             withCredentials:true
//         })
    
// console.log(data)
//         dispatch({type:'loginSuccess',payload:data})
//         toast.success(data.message)

//     }catch(error){
//         toast.error(error.response.data.message)
// dispatch({type:'loginFail',payload:error.response.data.message})
//     }
// }

import axios from 'axios';
import toast from 'react-hot-toast';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export const login = (email, password) => async (dispatch) => {
    console.log(email, password);
    try {
        dispatch({ type: 'loginRequest' });

        const { data } = await axios.post(
            'http://localhost:3001/api/v1/user/login',
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        console.log(data);

        dispatch({ type: 'loginSuccess', payload: data });
        toast.success(data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred');
        dispatch({
            type: 'loginFailure',
            payload: error.response?.data?.message || 'An error occurred',
        });
    }

};


export const getmyprofile = () => async (dispatch) => {
    try{
dispatch({type:"loadUserReuest"})

const {data} = await axios.get("http://localhost:3001/api/v1/user/myprofile",{withCredentials:true})
console.log(data)
dispatch({type:"loadUserSuccess",payload:data.user})
console.log(data.user)
    }catch(error){
        console.log(error)
        dispatch({type:"loadUserFail",payload:error.response.data.message})
    }
}
export const logoutuser = () => async(dispatch) => {
    try{
dispatch({type:"logoutRequest"})
const {data} = await axios.get("http://localhost:3001/api/v1/user/logout",{withCredentials:true})
localStorage.removeItem('token'); 
dispatch({type:"logoutSuccess",payload:data.message})
console.log(data.message)
toast.success(data.message)
    }catch(error){
dispatch({type:"logoutFail",payload:error.response.data.message})
toast.error(error.response.data.message)
    }
} 

export const registeruser =(formdata) => async(dispatch) => {
    try{
        dispatch({type:"RegisterRequest"})
        const {data} = await axios.post("http://localhost:3001/api/v1/user/register",formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        dispatch({type:"RegisterSuccess",payload:data.user})
        console.log(data.user)
        toast.success(data.message)
    }catch(error){
        dispatch({type:"RegisterFail",payload:error.response?.data?.message})
        toast.error(error.response.data.message)
    }
}
export const addtoPlaylist = (id) => async(dispatch) => {
    try{
        dispatch({type:"addtoPlaylistRequest"})
        const {data} = await axios.post(`http://localhost:3001/api/v1/user/addtoplaylist`,{id},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        dispatch({type:"addtoPlaylistSuccess",payload:data.message})
        console.log(data)
        toast.success(data.message)
    }catch(error){
        dispatch({type:"addtoPlaylistFailure",payload:error.response.data.message})
        toast.error(error.response.data.message)
        console.log(error)
    }
}


export const buysubscription = () => async(dispatch) => {

    try{
dispatch({type:"buysubscribeRequest"})
const {data} = await axios.get("http://localhost:3001/api/v1/payment/buy",{withCredentials:true})
dispatch({type:"buysubscribeSuccess",payload:data.subscriptionId})
console.log(data)
toast.success(data.message)
    }catch(error){
        console.log(error)
        dispatch({type:"buysubscribeFail",payload:error.response.data.message})
        toast.error(error.response.data.message)
    }
}
    
export const cancelsubscription = () => async(dispatch) => {

    try{
dispatch({type:"cancelsubscribeRequest"})

const {data} = await axios.delete("http://localhost:3001/api/v1/payment/cancel",{withCredentials:true})
dispatch({type:"cancelsubscribeSuccess",payload:data.message})
console.log(data)
toast.success(data.message)
    }catch(error){
        console.log(error)
        dispatch({type:"cancelsubscribeFail",payload:error.response.data.message})
        toast.error(error.response.data.message)
    }
}
    
