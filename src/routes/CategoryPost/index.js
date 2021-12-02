import './style.scss'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPostCategory } from '../../store/reducer/post.reducer';
import Posts from '../../component/Posts';
export default function CategoryPost() {
    const { cateId } = useParams();
    const posts = useSelector(state => state.postReducer.posts);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPostCategory({ cateId }))
    }, [cateId])

    return (
        <div className="category-post">
            <Posts posts={posts} />
        </div>
    )
}
