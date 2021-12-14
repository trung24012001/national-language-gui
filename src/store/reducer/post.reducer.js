import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service } from '../../utils'

export const getPosts = createAsyncThunk('posts/getPosts', async (payload, { rejectWithValue }) => {

    try {
        let response = null;
        if (payload.cateId) {
            response = await service.get(`/api/category/${payload.cateId}/all-post`);
        } else if (payload.hashTagId) {
            response = await service.get(`/api/tag/${payload.hashTagId}/all-post`);
        } else {
            response = await service.get('/api/post');
        }
        return {
            type: payload,
            data: response.data
        };

    } catch (error) {
        console.log(error);
        return rejectWithValue({ error: 'could not get posts' })
    }


})

export const getFavoritePosts = createAsyncThunk('posts/getFavoritePosts', async (payload, { rejectWithValue }) => {

    try {
        let response = await service.get('/api/favorite');
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue({ error: 'could not get favorite posts' })
    }
})

export const getOnePost = createAsyncThunk('posts/getOnePost', async ({ postId }) => {
    const response = await service.get(`/api/post/${postId}`);

    return response.data;
})

export const getCategories = createAsyncThunk('posts/getCategories', async () => {
    const response = await service.get(`/api/category`);
    console.log(response.data);
    return response.data;
})

export const getHashtags = createAsyncThunk('posts/getHashtags', async () => {
    const response = await service.get(`/api/tag`);

    return response.data;
})

export const getCategoriesFooter = createAsyncThunk('posts/getCategoriesFooter', async () => {
    const response = await service.get(`/api/category/footer`);
    return response.data;
})

export const getHashtagsFooter = createAsyncThunk('posts/getHashtagsFooter', async () => {
    const response = await service.get(`/api/tag/footer`);
    return response.data;
})


export const sendContact = createAsyncThunk('posts/sendContact', async ({ name, email, title, content }) => {
    console.log(name, email, title, content)
    const response = await axios.post('/api/contact', {
        name,
        email,
        title,
        content
    })

    return response.data;
})




export const postSlice = createSlice({
    name: 'Posts',
    initialState: {
        posts: [],
        categoryPosts: [],
        hashtagPosts: [],
        favoritePosts: [],
        relatePosts: [],
        categories: [],
        hashtags: [],
        categoriesFooter: [],
        hashtagsFooter: [],
        post: null,
        initLoading: false,
        postLoading: false,
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            console.log('pendding')
            state.initLoading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            let { type, data } = action.payload;
            if (type.cateId) {
                state.categoryPosts = data;
            } else if (type.hashTagId) {
                state.hashtagPosts = data;
            } else {
                state.posts = data;
            }
            console.log(action.payload)
            state.initLoading = false;
        },
        [getPosts.rejected]: (state, action) => {
            console.log(action.payload)
            state.initLoading = false;
        },
        [getOnePost.pending]: (state, action) => {
            state.post = null;
            state.postLoading = true;
        },
        [getOnePost.fulfilled]: (state, action) => {
            state.post = action.payload;
            console.log(action.payload)
            state.postLoading = false;
        },
        [getOnePost.rejected]: (state, action) => {
            console.log('could not get a post')
            state.postLoading = false;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            console.log('could not get category')
        },
        [getCategoriesFooter.fulfilled]: (state, action) => {
            state.categoriesFooter = action.payload;
        },
        [getCategoriesFooter.rejected]: (state, action) => {
            console.log('could not get category')
        },
        [getHashtags.fulfilled]: (state, action) => {
            state.hashtags = action.payload;

        },
        [getHashtags.rejected]: (state, action) => {
            console.log('could not get category')
        },
        [getHashtagsFooter.fulfilled]: (state, action) => {
            state.hashtagsFooter = action.payload;
        },
        [getHashtagsFooter.rejected]: (state, action) => {
            console.log('could not get category')
        },
        [getFavoritePosts.pending]: (state, action) => {
            state.initLoading = true;
        },
        [getFavoritePosts.fulfilled]: (state, action) => {
            state.favoritePosts = action.payload;
            state.initLoading = false;
        },
        [getFavoritePosts.rejected]: (state, action) => {
            console.log('could not get category');
            state.initLoading = false;
        },
    },
    reducers: {
        getRelatePosts: (state, action) => {
            let { cateId } = action.payload;
            state.relatePosts = state.posts.filter((p,idx) => {
                return p.category_id === cateId;
            }).splice(0, 5);
        }
    }
})


export const { getRelatePosts } = postSlice.actions;

export default postSlice.reducer
