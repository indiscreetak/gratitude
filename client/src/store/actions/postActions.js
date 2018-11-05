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
    .delete(`/api/posts/${data}`)
    .then(res => dispatch(getPosts()))
    .catch(err => console.log(err.data));
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
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.message
      })
    );
};
