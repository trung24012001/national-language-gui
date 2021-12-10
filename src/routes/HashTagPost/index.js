import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPosts } from '../../store/reducer/post.reducer';
import Posts from '../../component/Posts';
import './style.scss';

export default function HashTagPost() {
    const { hashTagId } = useParams();
    const hashtagPosts = useSelector(state => state.postReducer.hashtagPosts);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts({ hashTagId }))
    }, [hashTagId])

    return (
        <div className="hashtag-post">
            <Posts posts={hashtagPosts} />
        </div>
    )
}