import { useSelector, useDispatch } from "react-redux";
import { 
    allPosts, 
    postStatus, 
    postError, 
    getPosts, 
    postSuccess,
} from "../../slices/postSlice";
import React from 'react'
import { useEffect } from "react";
import Loader from "../Loader";
import { getUser } from "../../slices/authSlice";
import { Link } from "react-router-dom";

const ViewPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(allPosts);
    const status = useSelector(postStatus);
    const error = useSelector(postError);
    const user = useSelector(getUser);
    const success = useSelector(postSuccess);

    console.log('success', success );

    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);

    var content;

    if(status === 'idle') {
        content = <Loader />

    } else if (status === 'succeeded') {
        const postList = posts.response;
        const orderedList = postList && postList.slice().sort((a,b) => b.post_added.localeCompare(a.post_added));
        content = postList ? orderedList.map(post => (
          <Link to={`/${post.id}`}>
            <div key={post.id} className="card w-[1000px]  bg-base-300 shadow-xl">
            {post.post_image && <figure><img src={post.post_image} alt="Post image" /></figure>}
            <div className="card-body">
              <h2 className="card-title">
                {post.post_title}
              </h2>
              <p>{post.post_content}</p>
              {user && user.id === post.user_id && <div className="flex items-end">
                <button type = 'button' onClick = {() => handleDelete(post.id)} className="btn w-[90px] h-7 ml-[53rem] btn-error">Delete</button>
              </div>}
              <div className="card-actions justify-end">
                <div className="badge badge-outline p-2">{post.first_name} {post.last_name}</div>
              </div>
            </div>
          </div>
          </Link>
        )) : 
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">There are currently no posts. Be the first poster by signing up!</p>
              <Link to={'/register'}><button className="btn btn-primary">Sign Up</button></Link>
            </div>
          </div>
        </div>
    }
    else if(status === 'error'){
        content = <p>{error}</p>
    }

  return (
    <>
    <div className="flex flex-col m-4 items-center gap-4 justify-center">
      {content}
    </div>
    </>
  )
}

export default ViewPosts