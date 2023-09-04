import { useSelector, useDispatch } from "react-redux";
import { 
    allPosts, 
    postStatus, 
    postError, 
    getPosts 
} from "../../slices/postSlice";

import React from 'react'
import { useEffect } from "react";
import Loader from "../Loader";
import { getUser } from "../../slices/authSlice";

const ViewPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(allPosts);
    const status = useSelector(postStatus);
    const error = useSelector(postError);

    const user = useSelector(getUser);

    console.log(user);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getPosts());
        }
    }, [status, dispatch]);

    var content;

    if(status === 'idle') {
        content = <Loader />

    } else if (status === 'succeeded') {
        const postList = posts.response;
        const orderedList = postList.slice().sort((a,b) => b.post_added.localeCompare(a.post_added));
        content = orderedList.map(post => (
            <div className="card w-[1000px]  bg-base-100 shadow-xl">
            {post.post_image && <figure><img src={post.post_image} alt="Post image" /></figure>}
            <div className="card-body">
              <h2 className="card-title">
                {post.post_title}
              </h2>
              <p>{post.post_content}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline p-2">{post.first_name} {post.last_name}</div>
              </div>
            </div>
          </div>
        ))
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