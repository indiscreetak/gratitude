import { compose, createStore, applyMiddleware } from 'redux';
import postReducer from './reducers/postReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  postReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
