import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { postSuccess, resetSuccess, updatePost } from '../../slices/postSlice';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = ({setUpdate, post}) => {
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateContent, setUpdateContent] = useState('');
    const [updateImage, setUpdateImage] = useState(null);

    const success = useSelector(postSuccess);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const payload = new FormData();
    if(updateTitle){
        payload.append('post_title', updateTitle);    
    }

    if(updateContent) {
        payload.append('post_content', updateContent);    
    }

    if(updateImage) {
        payload.append('post_image', updateImage);  
    }

    const id = post[0].id;
    
    useEffect(() => {
        if(success) {
            toast.success(toast.message, {
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
                navigate('/');
            }, 2500)    
        }
    }, [success, dispatch])

    const handleUpdate = (e) => {
        e.preventDefault();
        if(!updateTitle && !updateContent && !updateImage) {
            return toast.info('Enter fields you want to update first', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }

        dispatch(updatePost({ id, payload }));
    }

  return (
    <div className="hero min-h-screen bg-base-200"> 
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Update Post</h1>
                <p className="py-6">Provide the details you want to update</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form action="" method='POST'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Title</span>
                            </label>
                            <input type="text" placeholder={post[0].post_title} value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Content</span>
                            </label>
                            <input type="text" placeholder={post[0].post_content} value={updateContent} onChange={(e) => setUpdateContent(e.target.value)} className="textarea textarea-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Image</span>
                            </label>
                            <label className="label">
                                <span className="label-text-alt">{updateImage ? updateImage.name : post[0].post_image}</span>
                            </label>
                                <input type="file" onChange={(e) => setUpdateImage(e.target.files[0])} className="file-input w-full max-w-xs" />
                                <span onClick={(e) => setUpdateImage(null)} className="label-text-alt cursor-pointer">Click to remove image</span>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                            <button type = 'button' onClick={() => setUpdate(value => !value)} className="btn btn-ghost">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default UpdateForm