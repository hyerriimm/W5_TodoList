import { configureStore } from '@reduxjs/toolkit'
import comments from '../modules/comments'
import todos from '../modules/todos'

export default configureStore({
    reducer: { 
      todos: todos.reducer,
      comments : comments.reducer
    }
})