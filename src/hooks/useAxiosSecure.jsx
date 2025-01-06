import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const secureAxios = axios.create({
    baseURL: `http://localhost:5000`,
    // withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate =  useNavigate()
    const { userSignOut } = useAuth()

    // interceptor for request to call get endpoint
    secureAxios.interceptors.request.use(config=>{
        const token = localStorage.getItem('jwt-token')
        console.log('Stopped all request here', token)
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, (error)=>{
        return Promise.reject(error)
    })

    // interceptor for response 401 & 403
    secureAxios.interceptors.response.use(res=>{
        return res;
    }, async err=>{
        const status = err.response.status;
        if(status=== 401 || status===403){
            await userSignOut();
            navigate('/signin')
        }
        console.log('interceptor err', status)
        return Promise.reject(err)
    })
    return secureAxios;
};

export default useAxiosSecure;