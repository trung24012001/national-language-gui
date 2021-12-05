import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import './style.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loading from '../Loading';

const PostCard = ({ post }) => {
  const history = useHistory();
  const [shadow, setShadow] = useState(3);
  const getImageUrl = (path) => {
    // return serviceUrl.concat(path);
    return path;
  }
  const mouseOver = (e, id) => {
    setShadow(6)
  }

  const mouseOut = (e, id) => {

    setShadow(3)
  }
  const handleShowPost = (event, id) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    history.push(`/post/${id}`)

  }
  return (
    <Card
      className="post-card"
      onMouseOver={e => mouseOver(e, post.id)}
      onMouseOut={e => mouseOut(e, post.id)}
      onClick={e => handleShowPost(e, post.id)}
      elevation={shadow}
    >
      <CardMedia
        component="img"
        height="240"
        image={getImageUrl(post.image)}
        alt="post"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <div className="post-category">
            {post.category.name}
          </div>
          <div className="post-hashtag">
            {Object.values(post.tags).map(tag => {
              return (
                <span key={tag.id}
                  style={{
                    margin: '8px',
                    opacity: '0.7',
                    fontSize: '14px'
                  }}>
                  <i>#{tag.name}</i>
                </span>
              )
            })}
          </div>
          <div className="post-title">
            {post.title}
          </div>

        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span className="post-preview">
            {post.content_preview}
          </span>
        </Typography>
      </CardContent>
    </Card>
  )
}




export default function Posts({ posts }) {
  const initLoading = useSelector(state => state.postReducer.initLoading);


  return (

    <div className="post-list">
      {initLoading ? <Loading />
        :
        <>
          {posts.map(post => {
            return (
              <PostCard key={post.id} post={post} />
            )
          })}
        </>
      }
    </div>
  )
}
