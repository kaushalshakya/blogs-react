import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSuccess, registerThunk, resetSuccess } from '../../slices/userSlice';
import { getError } from '../../slices/authSlice';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    
    const success = useSelector(getSuccess);
    const error = useSelector(getError);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,
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
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setTimeout(() => {
                dispatch(resetSuccess());
                navigate('/login');
            }, 2100);
        }
    }, [success, dispatch])

    const handleRegister = () => {
        if(!firstName || !lastName || !email || !password || !confirmPassword) {
            return toast.error('All necessary fields are not provided', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailPattern.test(email)){
            return toast.error('Email address is not valid', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
        
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', image);

        dispatch(registerThunk(formData));
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleRegister();
        }
    }

  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Don't have an account?</h1>
            <p className="py-6">Fill in the details and create your own account!</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <form action = "" method='POST' onSubmit={(e) => e.preventDefault()}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="First Name here" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Last Name here" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email address" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="******" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="********" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Profile Image:</span>
                        </label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="file-input w-full max-w-xs" />
                        <label className="label">
                            <p className="label-text-alt">
                                Already have an account? Click <span className='link link-hover'><Link to={'/login'}>here</Link></span> to login
                            </p>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={handleRegister} onKeyDown={handleKeyDown}>Register</button>
                    </div>
                    <ToastContainer />
                </form>
            </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm