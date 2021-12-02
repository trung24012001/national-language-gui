import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom';
import './style.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loading from '../Loading'
export default function Posts({ posts }) {
  const initLoading = useSelector(state => state.postReducer.initLoading)
  const history = useHistory();
  const getImageUrl = (path) => {
    // return serviceUrl.concat(path);
    return path;
  }
  const handleShowPost = (event, id) => {
    event.preventDefault();
    history.push(`/post/${id}`)
  }
  return (

    <div className="post-list">
      {initLoading ? <Loading />
        :
        <>
          {posts.map(post => {
            return (
              <Card key={post.id} sx={{ width: 345, margin: '15px' }}>
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
                    {post.tags && post.tags.length > 0 &&
                      <div className="post-hashtag">
                        {post.tags.map(tag => {
                          return (
                            <>
                              {tag}
                            </>
                          )
                        })}
                      </div>
                    }
                    <div className="post-title">
                      {post.title}
                    </div>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={event => handleShowPost(event, post.id)}>Show More</Button>
                </CardActions>
              </Card>
            )
          })}
        </>
      }
    </div>
  )
}
