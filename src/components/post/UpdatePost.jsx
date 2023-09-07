import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { allPosts, getPosts } from '../../slices/postSlice';

const UpdatePost = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    const { id } = useParams();
    const posts = useSelector(allPosts);
    console.log(posts.response);
    const post = posts.response.filter(post => post.id == id);
    console.log(post);
  return (
    <div>
        <h1>Post ID: {post[0].id}</h1>
        <h1>Post Title: {post[0].post_title}</h1>
        <h1>Post Content: {post[0].post_content}</h1>
        <h1>Post Image: {post[0].post_image ? post[0].post_image : 'null'}</h1>
    </div>
  )
}

export default UpdatePost