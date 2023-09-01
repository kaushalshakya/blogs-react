import { useSelector, useDispatch } from "react-redux";
import { 
    allPosts, 
    postStatus, 
    postError, 
    getPosts 
} from "../../slices/postSlice";
import AuthorImage from "./AuthorImage";

import React from 'react'
import { useEffect } from "react";

const ViewPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(allPosts);
    const status = useSelector(postStatus);
    const error = useSelector(postError);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getPosts());
        }
    }, [status, dispatch]);

    var content;

    if(status === 'idle') {
        content = <p className="flex items-center justify-center h-screen">Loading...</p>
    } else if (status === 'succeeded') {
        const postList = posts.response;
        const orderedList = postList.slice().sort((a,b) => b.post_added.localeCompare(a.post_added));
        content = orderedList.map(post => (
            <div className="card w-[700px]  bg-base-100 shadow-xl">
            {post.post_image && <figure><img src={post.post_image} alt="Post image" /></figure>}
            <div className="card-body">
              <h2 className="card-title">
                {post.post_title}
              </h2>
              <p>{post.post_content}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{post.first_name} {post.last_name}</div>
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
        <div className="flex flex-col items-center gap-4 justify-center">
            <h1 className="text-2xl font-black">{posts.message}</h1>
            {content}
        </div>
    </>
  )
}

export default ViewPosts