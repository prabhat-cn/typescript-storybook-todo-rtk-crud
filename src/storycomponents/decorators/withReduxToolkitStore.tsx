import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoSlice from '../../store/reducers/todoSlice';
import storyTodoSlice from '../../store/reducers/storyTodoSlice';

const toolkitStore = configureStore({
  reducer: {
    // todos: todoSlice,
    storytodos: storyTodoSlice,
  },
});

const rootReducer = combineReducers({
  // todos: todoSlice,
  storytodos: storyTodoSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export function withReduxToolkitStore({ Story }: any) {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
}
