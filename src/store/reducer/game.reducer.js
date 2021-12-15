import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service } from '../../utils'

export const getQuestions = createAsyncThunk('game/getQuestions', async (payload, { rejectWithValue }) => {
    try {
        const response = await service.get('/api/question');

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue({
            error: "Could not get questions!"
        })
    }
})

export const getMemories = createAsyncThunk('game/getMemories', async ({ level }, { rejectWithValue }) => {
    try {
        const response = await service.get(`/api/words/memory/${level}`);

        console.log(response.data)

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue({
            error: "Could not get memories!"
        })
    }
})

export const getHangMans = createAsyncThunk('game/getHangMans', async ({ }, { rejectWithValue }) => {
    try {
        const response = await service.get('/api/words/hangman');

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue({
            error: "Could not get hangMans!"
        })
    }
})

export const getScores = createAsyncThunk('game/getScores', async ({ game }, { rejectWithValue }) => {

    try {
        const response = await service.get(`/api/score/${game}`);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue({
            error: "Could not get scores!"
        })
    }


})

export const sendScore = createAsyncThunk('game/sendScore', async ({ game, name, score }, { rejectWithValue }) => {

    try {
        console.log(game, name, score)
        const response = await service.post(`/api/score/post`, {
            name,
            score,
            name_game: game
        });
        
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue({
            error: "Could not post score!"
        })
    }


})


export const gameSlice = createSlice({
    name: 'Game',
    initialState: {
        questions: [],
        memories: [],
        hangMans: [],
        gameLoading: false,
        scores: [],

    },
    extraReducers: {
        [getQuestions.pending]: (state, action) => {
            state.gameLoading = true;
        },
        [getQuestions.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.questions = action.payload;
            state.gameLoading = false;
        },
        [getQuestions.rejected]: (state, action) => {
            console.log(action.payload);
            state.gameLoading = false;
        },
        [getScores.fulfilled]: (state, action) => {
            state.scores = action.payload;
        },
        [getScores.rejected]: (state, action) => {
            console.log(action.payload);
        },
        [getMemories.pending]: (state, action) => {
            state.gameLoading = true;
        },
        [getMemories.fulfilled]: (state, action) => {
            state.memories = action.payload;
            state.gameLoading = false;
        },
        [getMemories.rejected]: (state, action) => {
            console.log(action.payload);
            state.gameLoading = false;
        },
        [getHangMans.pending]: (state, action) => {
            state.gameLoading = true;
        },
        [getHangMans.fulfilled]: (state, action) => {
            state.hangMans = action.payload;
            state.gameLoading = false;
        },
        [getHangMans.rejected]: (state, action) => {
            console.log(action.payload);
            state.gameLoading = false;
        },
    },
    reducers: {

    }
})



export default gameSlice.reducer
