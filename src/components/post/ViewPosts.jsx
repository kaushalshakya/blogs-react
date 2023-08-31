import { useSelector, useDispatch } from "react-redux";
import { 
    allPosts, 
    postStatus, 
    postError, 
    getPosts 
} from "../../slices/postSlice";

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
        content = <p>Loading... </p>
    } else if (status === 'succeeded') {
        const postList = posts.response;
        const orderedList = postList.slice().sort((a,b) => b.post_added.localeCompare(a.post_added));
        content = orderedList.map(post => (
            <article className="" key = {post.id}>
                <h1>{post.post_title}</h1>
                <h3>{post.post_content}</h3>
                {post.post_image && <img src={post.post_image} alt="" /> }
            </article>
        ))
    }
    else if(status === 'error'){
        content = <p>{error}</p>
    }

  return (
    <>
        <div className="flex flex-col items-center gap-4 justify-center">
            <h1 className="text-xl">{posts.message}</h1>
            {content}
        </div>
    </>
  )
}

export default ViewPosts