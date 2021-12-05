import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './homePage.scss';
import { useHistory } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import _ from 'lodash';
import { getPosts } from '../../store/reducer/post.reducer';
import Posts from '../../component/Posts';
import SlideShow from '../../component/SlideShow';


export default function HomePage() {
    const posts = useSelector(state => state.postReducer.posts)
    const history = useHistory();
    const [searchLoading, setSearchLoading] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [searchList, setSearchList] = useState([]);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPosts({}))

    }, [])

    const searchDebounce = useCallback(_.debounce(async (text) => {
        let search = posts.filter(post => {
            console.log(post.category.name.toLowerCase())
            let check = post.title.toLowerCase().includes(text);
            if (!check) {
                check = post.category.name.toLowerCase().includes(text);
            }
            return check;
        });
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
                <SlideShow />
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
                                                    <div style={{
                                                        width: '120px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        fontWeight: '500'

                                                    }}>
                                                        {post.category.name}
                                                    </div>
                                                    <div style={{
                                                        marginLeft: "15px",
                                                        width: '500px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden'
                                                    }}>
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
