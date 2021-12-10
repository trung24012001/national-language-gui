import './style.scss'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPosts } from '../../store/reducer/post.reducer';
import Posts from '../../component/Posts';
export default function CategoryPost() {
    const { cateId } = useParams();
    const categories = useSelector(state => state.postReducer.categories);
    const [cateName] = useState((categories.find(cate => cate.id == cateId) || {}).name)
    const categoryPosts = useSelector(state => state.postReducer.categoryPosts);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts({ cateId }))
    }, [cateId])

    return (
        <div className="category-post">
            <div style={{
                fontWeight: 600,
                fontSize: '24px',
                marginLeft: '50px'
            }}>{cateName}</div>
            <Posts posts={categoryPosts} />
        </div >
    )
}
