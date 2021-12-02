import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './homePage.scss';
import { serviceUrl } from '../../ultils';

import Loading from '../../component/Loading'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';
import parser from 'html-react-parser';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import _ from 'lodash';
import { getPosts } from '../../store/reducer/post.reducer';
import Posts from '../../component/Posts';


export default function HomePage() {
    const posts = useSelector(state => state.postReducer.posts)
    const history = useHistory();
    const [searchLoading, setSearchLoading] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [searchList, setSearchList] = useState([]);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPosts())

    }, [])

    const searchDebounce = useCallback(_.debounce(async (text) => {
        let search = posts.filter(post => post.title.toLowerCase().includes(text));
        setSearchList(search);
        setSearchLoading(false);
    }, 500))

    const onSearch = (event) => {
        let text = event.target.value.trim().toLowerCase();
        searchDebounce(text);
        setTextSearch(event.target.value);
        setSearchLoading(true);
    }



    const handleShowPost = (event, id) => {
        event.preventDefault();
        history.push(`/post/${id}`)
    }

    return (
        <div className="home-page" onClick={e => {
            e.preventDefault();
            setTextSearch('');
            setSearchList([]);
        }}>
            <div className="home-center">
                <div className="home-search">
                    <div className="search-post">
                        <SearchIcon />
                        <input
                            type="search"
                            placeholder="Search"
                            className="input-search"
                            aria-label="Search"
                            onChange={onSearch}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                            value={textSearch}
                        />
                        {textSearch.length > 0 &&
                            <div className="search-list" >
                                {
                                    searchList.length > 0 ?
                                        searchList.map(post => {
                                            return (
                                                <div key={post.id}
                                                    className="post-find"
                                                    onClick={event => handleShowPost(event, post.id)}

                                                >
                                                    <div style={{}}>
                                                        {post.category.name}
                                                    </div>
                                                    <div style={{ marginLeft: "15px" }}>
                                                        {post.title}
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <>
                                            <LoadingButton loading={searchLoading} style={{ display: !searchLoading && 'none' }} variant="text" />
                                            <div style={{ display: searchLoading && 'none', fontWeight: '600' }}>
                                                No post found
                                            </div>
                                        </>
                                }

                            </div>
                        }
                    </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: '24px', marginLeft: '50px' }}>
                    All Post
                </div>
                <Posts posts={posts} />
            </div >

        </div >
    )
}
