import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../../Component/shared/SocialLogin';

const Signin = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { signinuser } = useAuth();

    const from = location.state?.from?.pathname || "/";
    console.log('from login page state', location.state)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.table(email, password)
        try {
            signinuser(email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user)
                    if (user) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Successfully logged in",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, {replace: true})
                    }
                })
        } catch (error) {
            console.log("Login Filed, Please try again!", error)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

    const handleValidateCaptcha = () => {
        const captchhaValue = captchaRef.current.value;
        if (validateCaptcha(captchhaValue)) {
            setDisabled(false)
        } else {
            // need to do true
            setDisabled(false)
        }
        console.log(captchhaValue)
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss || Signin</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSignIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} ref={captchaRef} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="Signin" />
                            </div>
                        </form>
                        <p className='px-8 py-3'><small>New Here? <Link to="/signup">Create an account</Link> </small></p>
                        <SocialLogin/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin; <h2>Please Sign In</h2>