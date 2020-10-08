
import React, { useState } from 'react';

const NewPostForm = props => {
  const [post, setComment] = useState(props.initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target
    setComment({ ...post, [name]: value })
  };

  return (
      <form onSubmit={event => {
        event.preventDefault()
        if (!post.body || !post.commenter) return;
        props.addPost(post)
        setComment(props.initialFormState)
      }}>
        <label>Body</label>
        <input type="text" name="body" value={post.body} onChange={handleInputChange} ></input>
        <label>From</label>
        <input type="text" name="commenter" value={post.commenter} onChange={handleInputChange} ></input>
        <button>Send Message</button>
      </form>
  )
};

export default NewPostForm;
