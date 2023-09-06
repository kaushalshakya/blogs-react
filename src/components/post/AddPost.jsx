import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = () => {
        console.log('Submit');
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
    }

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
                            <input type="file" value={image} onChange={(e) => setImage(e.target.value)} className="file-input w-full max-w-xs" />
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