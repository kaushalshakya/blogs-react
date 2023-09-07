import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { 
    allPosts, 
    getPosts,
    resetSuccess,
    deletePost,
    postSuccess,
} from '../../slices/postSlice';
import { getUser } from '../../slices/authSlice';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdatePost = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const endOfPageRef = useRef(null);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [postId, setPostId] = useState(null);
    const [update, setUpdate] = useState(false);

    const success = useSelector(postSuccess);

    console.log('success', success );

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
            navigate('/')
        }, 2100)
      }
    }, [success, dispatch])

    const handleDelete = (postId) => {
      setConfirmDelete(true);
      setPostId(postId);
      console.log('postId', postId);
    }

    const deleteConfirm = () => {
        console.log(postId);
        dispatch(deletePost(postId));
        setConfirmDelete(false);
        setPostId(null);
    }

    const cancelDelete = () => {
      setConfirmDelete(false);
      setPostId(null);
    }

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    useEffect(() => {
        if(update) {
            endOfPageRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [update]);

    const { id } = useParams();
    const posts = useSelector(allPosts);
    console.log(posts.response);
    const post = posts.response.filter(post => post.id == id);
    console.log(post);
  return (
    <>
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
            <h1 className="text-5xl font-bold">{post[0].post_title}</h1>
            {post[0].post_image && <img src={post[0].post_image} className="max-w-[1000px] rounded-lg shadow-2xl" />}
            <p className="py-6">{post[0].post_content}</p>
            <div className='flex gap-5'>
                {user && (user.id === post[0].user_id) && <button type = 'button' onClick={() => setUpdate(value => !value)} className="btn btn-primary">{!update ? 'Update' : 'Cancel'}</button>}
                {user && (user.id === post[0].user_id) && <button type = 'button' onClick={() => handleDelete(post[0].id)} className="btn btn-error">Delete</button>}
            </div>
        </div>
      <ToastContainer />
    </div>
    {confirmDelete && ( 
      <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl mb-1 font-bold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this post?</p>
              <div className="modal-action">
                <button onClick={deleteConfirm} className="btn btn-primary">Yes, Delete</button>
                <button onClick={cancelDelete} className="btn btn-ghost">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
    {update &&
        <div ref={endOfPageRef} className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" className="input input-bordered" />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                <button type = 'button' onClick={() => setUpdate(value => !value)} className="btn btn-ghost">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default UpdatePost