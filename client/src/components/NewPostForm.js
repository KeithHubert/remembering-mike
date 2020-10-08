
import React, { useState } from 'react';

const NewPostForm = props => {
  const [post, setComment] = useState(props.initialFormState);

  const handleInputChange = event => {
    const { name, value, files } = event.target
    setComment({ ...post, [name]: files ? files : value })
  }

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
        <label type="text">Select files:</label>
        <input type="file" id="photos" name="photos" multiple onChange={handleInputChange}/>
        <button>Send Message</button>
      </form>
  )
};

export default NewPostForm;
