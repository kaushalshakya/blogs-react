import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts, postSuccess } from '../../slices/postSlice';
import { resetSuccess } from '../../slices/postSlice';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const success = useSelector(postSuccess);


    const handleSubmit = () => {
        console.log('Image', image);
        if(!title && !content && !image ){
            return toast.error('Your post cannot be empty', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }     
        const formData = new FormData();
        formData.append('post_title', title);
        formData.append('post_content', content);
        formData.append('post_image', image);

        dispatch(addPosts(formData));
    }

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
                navigate('/');
            }, 2500);
        }
    }, [success, dispatch])

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') { 
            handleSubmit();
        }
    }

  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Add Post</h1>
            <p className="py-6">Share your updates with the world!</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form action="" method='POST' onSubmit={(e) => e.preventDefault()}>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Title</span>
                            </label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your post title here" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Content</span>
                            </label>
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Your post body here" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="file-input w-full max-w-xs" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleSubmit} onKeyDown={handleKeyDown}>Post</button>
                        </div>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddPost