import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPosts } from '../../store/reducer/post.reducer';
import Posts from '../../components/Posts';
import './style.scss';

export default function HashTagPost() {
    const { hashTagId } = useParams();
    const hashtags = useSelector(state => state.postReducer.hashtags);
    const [hashtagName, setHashTagName] = useState('')
    const hashtagPosts = useSelector(state => state.postReducer.hashtagPosts);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts({ hashTagId }))
    }, [hashTagId])

    useEffect(() => {
        if (hashTagId && hashtags.length) {
            setHashTagName(hashtags.find(h => h.id == hashTagId).name);
        }
    }, [hashtags.length])

    return (
        <div className="hashtag-post">
            <div style={{
                fontWeight: 600,
                fontSize: '24px',
                marginLeft: '50px'
            }}>#{hashtagName}</div>
            <Posts posts={hashtagPosts} />
        </div >
    )
}
