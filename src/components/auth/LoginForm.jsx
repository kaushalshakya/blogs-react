import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, getError, getMessage } from '../../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const success = useSelector(getMessage);
    console.log('success msg', success);


    const error = useSelector(getError);
    console.log('error msg', error);

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [error]);

    useEffect(() => {
        if(success) {
            toast.success(success.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [success]);
    

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const payload = {
            email: email,
            password: password
        }

        dispatch(loginThunk(payload));
    }

    const handleKeyDown = (e) => {
        if(e.key.toLowerCase() == 'enter') {
            e.preventDefault();
            handleSubmit();
        }
    }

  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Enter your email and password to login and start posting!</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form action="" method='POST'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type = 'email' value={email} name = 'email' className="input input-bordered w-full max-w-xs" placeholder='Email address here' onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type = 'password' value={password} name = 'password' className="input input-bordered w-full max-w-xs" placeholder = '********' onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={handleSubmit} onKeyDown={handleKeyDown} tabIndex='0'>Login</button>
                    <ToastContainer />
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm