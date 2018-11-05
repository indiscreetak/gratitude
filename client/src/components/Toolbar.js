import React, { Component } from 'react';
import styled from 'styled-components';
import OnEvent from 'react-onevent';
import { Column, Tag, Button, Input, Delete, Field, Control } from 'bloomer';
import { connect } from 'react-redux';
import { Spring, animated } from 'react-spring';
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
  margin-bottom: 1em;
  padding: 0.8em;
  font-size: 1em;
`;

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      tagsInputValue: '',
      isOpen: false,
      body: ''
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
    this.setState({ body: '', isOpen: false, tags: [] });
  };

  onHandleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    const { isOpen } = this.state;

    const postForm = (
      <form
        style={{ display: 'flex', flexFlow: 'column' }}
        onSubmit={this.onHandleSubmit}
      >
        <Spring
          to={{ height: isOpen ? '300px' : '50px' }}
          config={{ friction: isOpen ? 6 : 20 }}
        >
          {styles => (
            <PostBodyInput
              name="body"
              style={styles}
              onClick={this.openPostArea}
              onChange={this.onHandleChange}
              value={this.state.body}
              placeholder="What are you grateful for today?"
            />
          )}
        </Spring>
        {this.state.isOpen ? (
          <div>
            <OnEvent space={e => this.addTag(e.target.value)}>
              <Input
                value={tagsInputValue}
                onChange={e => {
                  this.updateTagValue(e.target.value);
                }}
                type="text"
                placeholder="Tags seperated by space"
              />
            </OnEvent>
            {tags &&
              tags.map((tag, index) => (
                <Tag
                  style={{ margin: '0.5em' }}
                  isColor="info"
                  isSize="medium"
                  key={index}
                >
                  {tag}
                  <Delete onClick={e => this.removeTag(tag)} />
                </Tag>
              ))}
            <br />
            <Field isGrouped style={{ marginTop: '1em' }}>
              <Control>
                <Button
                  isColor="success"
                  type="submit"
                  disabled={this.state.body.length <= 0}
                >
                  POST
                </Button>
              </Control>
              <Control>
                <Button isColor="danger" onClick={this.closePostArea}>
                  CANCEL
                </Button>
              </Control>
            </Field>
          </div>
        ) : null}
      </form>
    );

    return (
      <div>
        <Container>{postForm}</Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  bodyValue: state.bodyValue
});

const mapDispatchToProps = dispatch => ({
  onGetPosts: () => dispatch(getPosts()),
  onAddPost: data => dispatch(addPost(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
