import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const { gooleSignIn } = useAuth();

    const navigate = useNavigate();

    const handleGoogleSignin = () =>{
        gooleSignIn()
        .then(result=>{
            // console.log(result.user)
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email
            }
            axiosPublic.post('/users', userInfo)
            .then(response=>{
                // console.log(response.data)
                if(response.data){
                    navigate('/')
                }
            })
        })
    }
    return (
        <div className='p-8'>
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignin} className="btn">
                    <FaGoogle className='mr-4'/>
                    <span>Google</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;