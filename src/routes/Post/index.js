import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import parser from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePost, getRelatePosts } from '../../store/reducer/post.reducer'
import './post.scss'
import { getImageUrl, serviceUrl } from '../../utils';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const RelatePost = ({ post }) => {
    const [mouseOver, setMouseOver] = useState(false);
    const history = useHistory();

    const handleMouseOver = () => {
        setMouseOver(true);
    }

    const handleMouseLeave = () => {
        setMouseOver(false);
    }
    return (
        <div className="relate-post"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={e => {
                e.preventDefault();
                history.push(`/post/${post.id}`)
            }}
        >

            <img width="100%" height='200px'
                style={{ borderRadius: '10px' }}
                src={getImageUrl(post.image)} />
            <div style={{ fontSize: '18px' }}>
                <strong>{post.title}</strong>
            </div>


            <div style={{
                opacity: 0.6,
                overflow: 'hidden',
                height: !mouseOver ? 0 : '120px',
                transition: 'height 0.7s'
            }}>
                {post.content_preview}
            </div>

        </div>
    )

}

const SeeMorePost = ({ post }) => {
    const [mouseOver, setMouseOver] = useState(false);
    const history = useHistory();

    const handleMouseOver = () => {
        setMouseOver(true);
    }

    const handleMouseLeave = () => {
        setMouseOver(false);
    }
    return (
        <div className='footer-post'
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={e => {
                e.preventDefault();
                history.push(`/post/${post.id}`)
            }}
        >
            <img src={getImageUrl(post.image)}
                style={{
                    borderRadius: '10px',
                    width: !mouseOver ? '300px' : '350px',
                    height: !mouseOver ? '200px' : '250px',
                    transition: '.5s all'
                }}
            />
            <div style={{ fontSize: '18px' }}>
                <strong>{post.title}</strong>
            </div>
        </div>
    )

}

export default function Post() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(state => state.postReducer.posts);
    const post = useSelector(state => state.postReducer.post);
    const relatePosts = useSelector(state => state.postReducer.relatePosts);
    const initLoading = useSelector(state => state.postReducer.initLoading);


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getOnePost({ postId }));
    }, [postId])

    useEffect(() => {
        if (posts.length && post) {
            console.log(post);
            dispatch(getRelatePosts({ cateId: post.category_id }));
        }
    }, [post, posts.length])

    return (

        <div className="post-component">
            {post ? <>
                <div style={{ width: '100%', background: '#000', display: 'flex' }}>
                    <div className="post-image"
                        style={{
                            backgroundImage: `url(${getImageUrl(post.image)})`,
                        }}
                    >
                    </div>
                </div>
                <div className="post-container">
                    <div className="post-article">
                        <div className="post-title">
                            <h1>{post.title}</h1>
                            {Object.values(post.tags).map(tag => {
                                return (
                                    <div key={tag.id} className="hash-tag">
                                        <Link to={`/hashtag/${tag.id}`} ><i>#{tag.name}</i></Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="post-content">
                            {post.content && parser(post.content)}
                        </div>

                        <div className='post-info'>
                            <div>Người đăng: {post.created_by.name}</div>
                            <div>Ngày đăng: {post.created_at.split('T')[0]}</div>
                        </div>
                    </div>
                    <div className="post-relative-list" >
                        <h3>Relative Posts</h3>
                        {initLoading && <Loading />}

                        {relatePosts.map(rep => {
                            return (
                                <RelatePost post={rep} key={rep.id} />
                            )
                        })}
                    </div>


                </div>
                <div className='post-footer'>


                    <div className='see-more'>
                        {initLoading && <Loading />}

                        {relatePosts.filter((post, idx) => idx <= 3).map(post => {
                            return (
                                <SeeMorePost post={post} />
                            )
                        })}
                    </div>
                </div>
            </>
                :
                <Loading />
            }

        </div>


    );
}
