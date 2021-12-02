import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service } from '../../ultils'

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await service.get('/api/post');

    return response.data;
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

export const getPostCategory = createAsyncThunk('posts/getPostCategory', async ({ cateId }) => {
    const response = await service.get(`/api/category/${cateId}/all-post`);
    return response.data;
})


export const postSlice = createSlice({
    name: 'Posts',
    initialState: {
        posts: [],
        categories: [],
        hashtags: [],
        post: null,
        initLoading: false,
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            console.log('pendding')
            state.initLoading = true;
            state.posts = [];
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            console.log(action.payload)
            state.initLoading = false;
        },
        [getPosts.rejected]: (state, action) => {
            console.log('could not get posts')
            state.initLoading = false;
        },
        [getOnePost.pending]: (state, action) => {
            state.post = null;
            state.initLoading = true;
        },
        [getOnePost.fulfilled]: (state, action) => {
            state.post = action.payload;
            console.log(action.payload)
            state.initLoading = false;
        },
        [getOnePost.rejected]: (state, action) => {
            console.log('could not get posts')
            state.initLoading = false;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            console.log('could not get category')
        },
        [getHashtags.fulfilled]: (state, action) => {
            state.hashtags = action.payload;

        },
        [getHashtags.rejected]: (state, action) => {
            state.hashtags = action.payload;
        },
        [getPostCategory.pending]: (state, action) => {
            state.initLoading = true;
            state.posts = []
        },
        [getPostCategory.fulfilled]: (state, action) => {
            state.initLoading = false;
            state.posts = action.payload;

        },
        [getPostCategory.rejected]: (state, action) => {
            state.initLoading = false;
            state.hashtags = action.payload;
        }
    },
    reducers: {
    }
})



export default postSlice.reducer