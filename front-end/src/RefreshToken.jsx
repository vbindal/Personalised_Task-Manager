import axios from "./axios";
import useAuth from "./useAuth";
import React from 'react'

const RefreshToken = () => {

    const {setAuth} = useAuth()
    const REFRESH_URL = '/api/v1/users/refresh'

    const refresh =  async()=>{
        const response = await axios.get(REFRESH_URL,{
            withCredentials:true,
    
        })
    
        setAuth((prev)=>{
            console.log(JSON.stringify(prev))
            console.log(response.data.accessToken)
            return {...prev,accessToken:response.data.accessToken}
        })
        return response.data.accessToken
    }

    
    return refresh
}

export default RefreshToken
