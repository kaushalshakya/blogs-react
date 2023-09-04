import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../slices/authSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector(getUser);
    console.log(user);
  return (
    <div className="navbar bg-base-300">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            </div>
            <Link to={'/'} className="btn btn-ghost normal-case text-xl">Blogs</Link>
        </div>
        <div className="navbar-center">
            {user ? 
            <>
               {user.image &&<img className='w-10 rounded-full' src={import.meta.env.VITE_IMAGE_URL + 'profile-img/' + user.image} alt="" />}
                <h1 className="btn btn-ghost normal-case text-xl">{user.first_name + ' ' + user.last_name}</h1>
            </> : 
            <h1 className="btn btn-ghost normal-case text-xl">Welcome user!</h1>}
        </div>
        <div className="navbar-end">
            {user ? <button className="btn" onClick={(e) => e.preventDefault()}>Logout</button> : <Link to={'/login'}><button className="btn" type='button'>Login</button></Link> }
        </div>
    </div>
  )
}

export default Navbar