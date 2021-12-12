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


export const gameSlice = createSlice({
    name: 'Game',
    initialState: {
        questions: [],
        answers: [],
        gameLoading: false,
        score: 0,

    },
    extraReducers: {
        [getQuestions.pending]: (state, action) => {
            state.gameLoading = true;
        },
        [getQuestions.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.questions = action.payload;
            state.gameLoading = false;
            for (let q of state.questions) {
                state.answers.push(...q.answers)
            }
        },
        [getQuestions.rejected]: (state, action) => {
            console.log(action.payload);
            state.gameLoading = false;
        }
    },
    reducers: {

    }
})



export default gameSlice.reducer
