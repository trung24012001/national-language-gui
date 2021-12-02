import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import parser from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePost } from '../../store/reducer/post.reducer'
import './post.scss'
import { serviceUrl } from '../../ultils';
import Loading from '../../component/Loading';

export default function Post() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.postReducer.post);

    useEffect(() => {
        dispatch(getOnePost({ postId }))
    }, [postId])

    return (

        <div className="post-component">
            {post ? <>
                <div className="post-image">
                    {/* <img src={`${serviceUrl}/${post.image}`} /> */}
                    <img  height="500px" src={`${post.image}`} />
                </div>
                <div className="post-container">
                    <div className="post-article">
                        <h2>
                            {post.title}
                        </h2>
                        {post ? parser(post.content) : <div>loading</div>}
                    </div>
                    {/* <div className="post-relative-list" >

                    </div> */}
                </div>
            </>
                :
                <Loading />
            }

        </div>


    );
}
