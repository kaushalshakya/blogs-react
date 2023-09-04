import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../slices/authSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [logout, setLogout] = useState(false);
    const user = useSelector(getUser);

    const handleLogout = (e) => {
        e.preventDefault();
        return setLogout(true);
    }

    const confirmLogout = () => {
        return setLogout(false);
    }

    const cancelLogout = () => {
        return setLogout(false);
    }

  return (
    <>
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
               {user.image && <h1 className="btn btn-ghost normal-case text-xl"><img className='w-10 rounded-full' src={import.meta.env.VITE_IMAGE_URL + 'profile-img/' + user.image} alt="" />  {user.first_name + ' ' + user.last_name}</h1>}
            </> : 
            <h1 className="btn btn-ghost normal-case text-xl">Welcome user!</h1>}
        </div>
        <div className="navbar-end">
            {user ? <button className="btn btn-primary" onClick={handleLogout}>Logout</button> : <Link to={'/login'}><button className="btn btn-primary" type='button'>Login</button></Link> }
        </div>
    </div>
    {logout && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl mb-1 font-bold">Confirm Logout</h2>
              <p>Are you sure you want to log out?</p>
              <div className="modal-action">
                <button onClick={confirmLogout} className="btn btn-primary">Yes, Logout</button>
                <button onClick={cancelLogout} className="btn btn-ghost">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar