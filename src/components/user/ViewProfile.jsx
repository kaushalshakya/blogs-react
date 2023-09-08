import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getSuccess } from '../../slices/userSlice'
import { Link } from 'react-router-dom'
import { resetSuccess } from '../../slices/userSlice'

export const ViewProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector(getUser);
    const success = useSelector(getSuccess);

    const [viewPosts, setViewPosts] = useState(false);
    const [content, setContent] = useState(null);

    const endOfPageRef = useRef(null);

    useEffect(() => {
        if(viewPosts && success) {
            dispatch(getProfile());

            const userPosts = success.map(post => ({
                ...post,
                post_image: post.post_image ? import.meta.env.VITE_IMAGE_URL + 'post-img/' + post.post_image : null
            }));
            
            console.log(userPosts);

            const sortedPosts = userPosts && userPosts.slice().sort((a,b) => b.post_added.localeCompare(a.post_added));

            console.log(sortedPosts);

            userPosts ? setContent(sortedPosts.map(post => (
                <div className="card w-[1000px] bg-base-300 shadow-xl">
                    { post.post_image &&
                        <figure className="px-10 pt-10">
                            <img src={post.post_image} alt="Shoes" />
                        </figure>
                    }
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{post.post_title}</h2>
                        <p>{post.post_content}</p>
                        <div className="card-actions">
                            <Link to={`/${post.id}`}><button className="btn btn-primary">View Details</button></Link>
                        </div>
                    </div>
                </div>
            ))) : (
                setContent(
                <h1>
                    This user has not posted anything
                </h1>)
            ); 

            endOfPageRef.current?.scrollIntoView({ behavior: "smooth" });
            dispatch(resetSuccess());
        }
    }, [viewPosts])

    const name = user.first_name + ' ' + user.last_name;

  return (
    <>
       <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                {user.image && <img src={import.meta.env.VITE_IMAGE_URL + 'profile-img/' + user.image} className="max-w-sm rounded-full shadow-2xl" />}
                <div>
                    <h1 className="text-5xl font-bold">{name}</h1>
                    <p className="py-6"> Email: {user.email}</p>
                    <button type = 'submit' onClick={() => setViewPosts(value => !value)} className="btn btn-primary">View Posts</button>
                </div>
            </div>
        </div>
        {viewPosts && <div ref={endOfPageRef} className='flex flex-col m-4 items-center gap-4 justify-center'>
            {content}
        </div>}
    </>
  )
}