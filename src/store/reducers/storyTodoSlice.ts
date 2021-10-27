import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getTodos,
  getTodo,
  addTodos,
  updateTodos,
  deleteTodos,
} from '../actions/storyTodoAction';
type TodoState = 'LOADING' | 'READY' | 'ERROR';

//  Coming data of API
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ShowTodo {
  todositem: Todo[];
  isLoading: boolean;
  todoItem: Todo;
  todoState: TodoState;
  errorMessage: string;
}

const initialState: ShowTodo = {
  todositem: [],
  isLoading: true,
  todoItem: {} as Todo,
  todoState: 'READY',
  errorMessage: '',
};

const storyTodoSlice = createSlice({
  name: 'todos',
  initialState: initialState,

  // normal actions create here
  reducers: {},

  extraReducers: function (builder) {
    // get Todos
    builder.addCase(getTodos.pending, (state, action) => {
      state.todoState = 'LOADING';
      state.isLoading = true;
    });
    builder.addCase(
      getTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.todositem = action.payload;
        state.errorMessage = '';
      }
    );
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.todoState = 'ERROR';
      state.todositem = [];
      state.errorMessage = action.error.message || '';
    });

    // get single Todo
    builder.addCase(getTodo.pending, (state, action) => {
      state.todoState = 'LOADING';
    });
    builder.addCase(getTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.todoItem = action.payload;
    });
    builder.addCase(getTodo.rejected, (state, action) => {
      state.todoState = 'ERROR';
      state.errorMessage = action.error.message || '';
    });

    // builder.addCase(
    //   getTodo.fulfilled,
    //   (state, action: PayloadAction<{ id: number }>) => {
    //     const index = state.todositem.findIndex(
    //       (tData) => tData.id === action.payload.id
    //     );
    //     state.todositem[index] = {
    //       ...state.todositem[index],
    //       ...action.payload,
    //     };
    //   }
    // );

    // Add Todos

    builder.addCase(
      addTodos.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        const todos = action.payload;
        if (todos) {
          state.todositem = [...state.todositem, todos];
        }
      }
    );

    // Update Todo

    builder.addCase(
      updateTodos.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        const index = state.todositem.findIndex(
          (tData) => tData.id === action.payload.id
        );
        state.todositem[index] = {
          ...state.todositem[index],
          ...action.payload,
        };
      }
    );

    // Delete Todo

    builder.addCase(
      deleteTodos.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        let index = state.todositem.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.todositem.splice(index, 1);
        state.isLoading = false;
      }
    );
  },
});

export default storyTodoSlice.reducer;
