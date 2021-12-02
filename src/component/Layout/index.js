import React, {useEffect} from 'react';
import {
    Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategories, getHashtags, getPosts } from '../../store/reducer/post.reducer';
import Footer from '../Footer';
import Navbar from '../Navbar';
import './layout.scss'
function Layout({ children, ...rest }) {
    const childrenWithProps = React.Children.map(children, child => {

        if (React.isValidElement(child)) {
            return React.cloneElement(child, { params: rest.location.pathname });
        }
        return child;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getHashtags())
    }, [])
    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    <>
                        <Navbar />
                        <div className="layout">
                            {childrenWithProps}
                        </div>
                        <Footer />
                    </>
            }
        />
    );
}

export default Layout;