import { configureStore } from '@reduxjs/toolkit';
import storyTodoSlice from './reducers/storyTodoSlice';
import todoSlice from './reducers/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoSlice, //name is same of usersReducers
    storytodos: storyTodoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
