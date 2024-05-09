import { configureStore } from '@reduxjs/toolkit';
import { employeeReducers } from './slices/employeeSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducers,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
