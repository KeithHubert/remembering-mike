import React from 'react'

const Post = ({ post, removePost }) => (
  <div>
    {post.body} | {post.commenter}
    <button onClick={() => removePost(post.id)}>Remove</button>

  </div>
)

export default Post
