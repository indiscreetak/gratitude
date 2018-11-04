import React, { Component } from 'react';
import OnEvent from 'react-onevent';
import './App.css';
import { connect } from 'react-redux';
import { getPosts } from './store/actions/postActions';
import Toolbar from './components/Toolbar';
import Card from './components/Card';

class App extends Component {
  componentDidMount() {
    this.props.onGetPosts();
  }
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Card />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  onGetPosts: () => dispatch(getPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
