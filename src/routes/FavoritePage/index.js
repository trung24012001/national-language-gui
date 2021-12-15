import './style.scss'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritePosts } from '../../store/reducer/post.reducer';
import Posts from '../../components/Posts';
export default function FavoritePage() {
    const favoritePosts = useSelector(state => state.postReducer.favoritePosts);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFavoritePosts({}))
    }, [])

    return (
        <div className="favorite-page">
            <div style={{
                fontWeight: 600,
                fontSize: '24px',
                marginLeft: '50px'
            }}>Favorite</div>
            <Posts posts={favoritePosts} />
        </div >
    )
}
