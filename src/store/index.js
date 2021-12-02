import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducer/post.reducer';

const store = configureStore({
  reducer: {
    postReducer
  }
})

export default store