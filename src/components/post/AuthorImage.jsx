import React from 'react'

const AuthorImage = ({post}) => {
  return (
    <img src={post.image} className='rounded-[100%] w-[50px] h-[50px]' />
  )
}

export default AuthorImage