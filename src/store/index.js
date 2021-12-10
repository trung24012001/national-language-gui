import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducer/post.reducer';
import gameReducer from './reducer/game.reducer';

const store = configureStore({
  reducer: {
    postReducer,
    gameReducer
  }
})

export default store