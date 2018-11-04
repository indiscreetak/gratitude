import * as actions from '../actions/types';

const initialState = {
  posts: [],
  errors: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };

    case actions.DELETE_POST:
      return {
        ...state,
        posts: action.payload
      };
    case actions.ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload)
      };
    default:
      return state;
  }
};
