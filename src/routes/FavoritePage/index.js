import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
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
import _ from 'lodash'


export default function FavoritePage() {
    const posts = useSelector(state => state.postReducer.posts)
    const initLoading = useSelector(state => state.postReducer.initLoading)
    const history = useHistory();
    const [searchLoading, setSearchLoading] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [searchList, setSearchList] = useState([]);

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

    const getImageUrl = (path) => {
        // return serviceUrl.concat(path);
        return path;
    }

    const handleShowPost = (event, id) => {
        event.preventDefault();
        history.push(`/post/${id}`)
    }

    return (
        <div className="post-page" onClick={e => {
            e.preventDefault();
            setTextSearch('');
            setSearchList([]);
        }}>
            <div className="post-center">
                <div className="post-search">
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

                {!initLoading ?
                    <>
                        <div style={{ fontWeight: 600, fontSize: '24px', marginLeft: '50px' }}>
                            Most Read
                        </div>
                        <div className="post-list">
                            {posts.map(post => {
                                return (

                                    <Card key={post.id} sx={{ width: 345, margin: '15px' }}>
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={getImageUrl(post.image)}
                                            alt="favorite"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <div className="post-category">
                                                    {post.category.name}
                                                </div>
                                                {post.title}
                                            </Typography>
                                            {/* <div style={{ opacity: 0.6 }}>
                                                {parser(post.content.substr(0, 200))}...
                                            </div> */}
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={event => handleShowPost(event, post.id)}>Show More</Button>
                                        </CardActions>
                                    </Card>

                                )
                            })}
                        </div>
                    </>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}
