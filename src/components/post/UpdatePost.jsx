import React, { useEffect, useState } from 'react'
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
    const navigate = useNavigate()

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
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

    const handleDelete = (id) => {
      setConfirmDelete(true);
      setDeleteId(id);
    }

    const deleteConfirm = () => {
      dispatch(deletePost(deleteId));
      setConfirmDelete(false);
      setDeleteId(null);
    }

    const cancelDelete = () => {
      setConfirmDelete(false);
      setDeleteId(null);
    }

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    const { id } = useParams();
    const posts = useSelector(allPosts);
    console.log(posts.response);
    const post = posts.response.filter(post => post.id == id);
    console.log(post);
  return (
    <>
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
            {post[0].post_image && <img src={post[0].post_image} className="max-w-[1000px] rounded-lg shadow-2xl" />}
            <div>
                <h1 className="text-5xl font-bold">{post[0].post_title}</h1>
                <p className="py-6">{post[0].post_content}</p>
                {user && (user.id === post[0].user_id) && <button type = 'button' className="btn btn-primary">Update </button>}
                {user && (user.id === post[0].user_id) && <button type = 'button' onClick={() => handleDelete(post[0].id)} className="btn btn-error">Delete </button>}
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
    </>
  )
}

export default UpdatePost