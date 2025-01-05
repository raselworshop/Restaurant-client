import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { gooleSignIn } = useAuth();
    const handleGoogleSignin = () =>{
        gooleSignIn()
        .then(result=>{
            console.log(result.user)
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