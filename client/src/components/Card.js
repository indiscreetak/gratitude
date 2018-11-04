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

const Wrapper = styled(CardElement)`
  margin: 1em;
`;

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const posts = this.props.posts.map(post => (
      <Wrapper>
        <CardHeader>
          <CardHeaderTitle>{post.body}</CardHeaderTitle>
          <CardHeaderIcon>
            <Icon style={{ color: 'red' }} className="fa fa-trash" />
          </CardHeaderIcon>
        </CardHeader>
        <CardContent>
          {post.body}
          <br />
          <span>
            {post.tags &&
              post.tags.map((tag, index) => (
                <Tag
                  style={{ margin: '.5em' }}
                  isSize="medium"
                  isColor="info"
                  key={index}
                  onClick={e => this.removeTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
          </span>
          <br />
          <span>
            <small>{moment(post.date).format('DD/MM/YYY')}</small>
          </span>
        </CardContent>
      </Wrapper>
    ));

    return <Column>{posts}</Column>;
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
