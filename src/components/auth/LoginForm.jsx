import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, getError, getMessage } from '../../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);

    const dispatch = useDispatch();

    const error = useSelector(getError);
    // console.log('selector error', error);

    const success = useSelector(getMessage);
    console.log('success msg', success);

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
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email.length || !password.length) {
            setAlert(true);
        } else{
            setAlert(false);
        }
        const payload = {
            email: email,
            password: password
        }

        dispatch(loginThunk(payload));

        if(success) {
            toast.success(success.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
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
                    <form action="">
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
                {alert && <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Credentials not provided</span>
                </div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm