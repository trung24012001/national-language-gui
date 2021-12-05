import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service } from '../../ultils'

export const getPosts = createAsyncThunk('posts/getPosts', async (payload, { rejectWithValue }) => {

    try {
        let response = null;
        if (payload.cateId) {
            response = await service.get(`/api/category/${payload.cateId}/all-post`);
        } else if (payload.hashTagId) {
            response = await service.get(`/api/hashtag/${payload.hashTagId}/all-post`);
        } else {
            response = await service.get('/api/post');
        }
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue({ error: 'could not get posts' })
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
        categories: [],
        categoriesFooter: [],
        hashtags: [],
        hashtagsFooter: [],
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
            console.log(action.payload)
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
            console.log('could not get a post')
            state.initLoading = false;
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
            state.categoriesFooter = action.payload;
        },
        [getHashtags.fulfilled]: (state, action) => {
            state.hashtags = action.payload;

        },
        [getHashtags.rejected]: (state, action) => {
            state.hashtags = action.payload;
        },
        [getHashtagsFooter.fulfilled]: (state, action) => {
            state.hashtagsFooter = action.payload;
        },
        [getHashtagsFooter.rejected]: (state, action) => {
            state.hashtagsFooter = action.payload;
        },
    },
    reducers: {

    }
})



export default postSlice.reducer
