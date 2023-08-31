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
        content = <p>Loading... </p>
    } else if (status === 'succeeded') {
        const postList = posts.response;
        const orderedList = postList.slice().sort((a,b) => b.post_added.localeCompare(a.post_added));
        content = orderedList.map(post => (
            <article className = "max-w-[50rem] rounded-2xl bg-[#273235] min-w-[50rem] p-4 m-4 space-y-4" key = {post.id}>
                <h1 className = "text-2xl font-bold">{post.post_title}</h1>
                <p>{post.post_content}</p>
                <img src={post.post_image} className="w-full rounded-2xl" alt="" /> 
                <section className="flex items-center gap-2 m-2 justify-end">{post.image && <AuthorImage post={post}/>}<i>{post.first_name} {post.last_name}</i></section>
            </article>
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