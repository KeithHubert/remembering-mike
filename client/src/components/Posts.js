import React, { useState, useEffect } from 'react'
import NewPostForm from './NewPostForm';
import axios from 'axios'
import qs from 'qs';
import Post from './Post';

const initialFormState = {
  body: '',
  commenter: '',
  photos: [],
  flagged: false,
}

const Posts = () => {
  const [posts, setPosts] = useState()

  useEffect(() => {
    axios.get('/api/v1/posts.json')
      .then(res => setPosts(res.data))
  }, []);

  const removePost = id => {
    axios.delete( '/api/v1/posts/' + id )
        .then(response => {
          setPosts(posts.filter(post => post.id !== id))
        })
        .catch(error => console.log(error))
  };

  const addPost = post => {
    axios.post('/api/v1/posts', qs.stringify(
      {
        posts: {
          body: post.body,
          commenter: post.commenter,
          photos: post.photos,
          flagged: post.flagged
        }
      }))
      .then(res => (console.log(res)))
      .catch(error => console.log(error))
    setPosts([...posts, post]);
  };

  return (
    <div>
      <div>
        <NewPostForm addPost={addPost} initialFormState={initialFormState} />
      </div>
      <div className="posts-list">
        {posts?.length > 0 && posts.map((post, i) => (
          <Post key={i} post={post} removePost={removePost}/>
        ))}
      </div>
    </div>
  )
}

export default Posts