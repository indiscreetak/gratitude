import React, { Component } from 'react';
import styled from 'styled-components';
import OnEvent from 'react-onevent';
import { Columns, Column, Box, Card, Tag, Button } from 'bloomer';
import { connect } from 'react-redux';
import { Spring, config, animated } from 'react-spring';
import { addPost, getPosts } from '../store/actions/postActions';

const Container = styled(Column)`
  background: linear-gradient(
    174deg,
    rgba(251, 193, 83, 1) 0%,
    rgba(255, 231, 32, 1) 100%
  );
  display: flex;
  flex-flow: column;
  padding: 2em;
`;

const PostBodyInput = styled(animated.textarea)`
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1em;
  margin-bottom: 1em;
  flex-grow: 1;
  display: flex;
`;

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      tags: [],
      tagsInputValue: '',
      isOpen: false
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleSubmit = e => {
    e.preventDefault();
    const data = {
      body: this.state.body,
      tags: this.state.tags
    };

    this.props.onAddPost(data);
  };

  onHandleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  openPostArea = () => {
    this.setState({ isOpen: true });
  };

  closePostArea = () => {
    this.setState({ isOpen: false });
  };

  addTag = tag => {
    if (tag === '') return;

    tag = tag.trim().toUpperCase();

    if (!(this.state.tags.indexOf(tag) > -1)) {
      let tags = this.state.tags.concat([tag]);
      this.updateTags(tags);
    }

    this.updateTagValue('');
  };

  updateTagValue = value => {
    if (value === ' ') {
      return;
    }
    this.setState({
      tagsInputValue: value
    });
  };

  removeTag = removeTag => {
    let tags = this.state.tags.filter(tag => tag !== removeTag);
    this.updateTags(tags);
  };

  updateTags = tags => {
    this.setState({
      tags
    });
  };

  render() {
    const { tags, tagsInputValue } = this.state;

    const postForm = (
      <form onSubmit={this.onHandleSubmit}>
        <input name="body" onChange={this.onHandleChange} />
        <OnEvent space={e => this.addTag(e.target.value)}>
          <input
            value={tagsInputValue}
            onChange={e => {
              this.updateTagValue(e.target.value);
            }}
            type="text"
            placeholder="Tags seperated by space"
          />
        </OnEvent>
        <button type="submit">ADD POST</button>
        <div>
          {tags &&
            tags.map((tag, index) => (
              <Tag
                isColor="info"
                key={index}
                onClick={e => this.removeTag(tag)}
              >
                {tag}
              </Tag>
            ))}
        </div>
      </form>
    );

    const { isOpen } = this.state;
    return (
      <div>
        <Container style={{ backgroundColor: 'yellow' }}>
          <Spring to={{ height: isOpen ? '200px' : '50px' }}>
            {styles => (
              <PostBodyInput style={styles} onClick={this.openPostArea} />
            )}
          </Spring>

          <Button>POST</Button>
          <Button onClick={this.closePostArea}>CANCEL</Button>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  onGetPosts: () => dispatch(getPosts()),
  onAddPost: data => dispatch(addPost(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
