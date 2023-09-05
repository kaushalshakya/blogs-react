import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logoutMessage } from '../slices/authSlice';
import { Link } from 'react-router-dom';
import { logoutThunk } from '../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const [logout, setLogout] = useState(false);
    const user = useSelector(getUser);
    const success = useSelector(logoutMessage);

    console.log('user', user);
    console.log('logout', success);

    const handleLogout = (e) => {
        e.preventDefault();
        return setLogout(true);
    }

    const confirmLogout = async() => {
      try{
        dispatch(logoutThunk(user.id)).unwrap();

        toast.success('Logged out successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        return setLogout(false);
      } catch(err) {
        console.log(err);
      }
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
        <div className="flex gap-3 navbar-end">
            {user ? <button className="btn btn-ghost normal-case" onClick={handleLogout}>Logout</button> : <Link to={'/login'}><button className="btn btn-ghost normal-case" type='button'>Login</button></Link> }
            {!user && <Link to={'/register'}><button className="btn btn-ghost normal-case" type='button'>Register</button></Link>}
        </div>
    </div>
    {logout && (
        <>
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
        <ToastContainer />
        </>
      )}
    </>
  )
}

export default Navbar