import React, { Component } from 'react';
import {
  Column,
  Card as CardElement,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  CardHeaderIcon,
  Tag,
  Icon
} from 'bloomer';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import { deletePost } from '../store/actions/postActions';

const Wrapper = styled(CardElement)`
  margin: 1em;
`;

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  removePost = id => {
    console.log('REMOVEPOST');
    this.props.onDeletePost(id);
  };

  render() {
    let posts;

    if (this.props.posts) {
      posts = this.props.posts.map((post, index) => (
        <Wrapper key={index}>
          <CardHeader>
            <CardHeaderTitle>{post.body}</CardHeaderTitle>
            <CardHeaderIcon onClick={() => this.removePost(post._id)}>
              <Icon style={{ color: 'red' }} className="fa fa-trash" />
            </CardHeaderIcon>
          </CardHeader>
          <CardContent>
            <span>
              {post.tags &&
                post.tags.map((tag, index) => (
                  <Tag
                    style={{ margin: '.5em' }}
                    isSize="medium"
                    isColor="info"
                    key={index}
                  >
                    {tag}
                  </Tag>
                ))}
            </span>
            <br />
            <span>
              <small>
                {moment(post.date).format('dddd Mo YYYY - h:mm:ss')}
              </small>
            </span>
          </CardContent>
        </Wrapper>
      ));
    } else {
      posts = <div>No posts found</div>;
    }
    return <Column>{posts.length > 1 ? posts.reverse() : posts}</Column>;
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  onDeletePost: postId => dispatch(deletePost(postId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
