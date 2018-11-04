import * as actions from './types';
import axios from 'axios';

export const getPosts = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: actions.GET_POSTS,
        payload: res.data.posts
      })
    )
    .catch(err => console.log(err));
};

export const deletePost = data => dispatch => {
  axios
    .delete('/:id', data)
    .then(res =>
      dispatch({
        type: actions.DELETE_POST,
        payload: res.data.posts
      })
    )
    .catch(err => console.log(err));
};

export const addPost = data => dispatch => {
  axios
    .post('/api/posts', data)
    .then(res =>
      dispatch({
        type: actions.ADD_POST,
        payload: res.data.post
      })
    )
    .catch(err => console.log(err));
};
