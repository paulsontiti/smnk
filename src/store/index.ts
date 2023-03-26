import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import experienceReducer from './slices/experienceSlice'
import serviceSlice from './slices/serviceSlice'
import bankDetailsSlice from './slices/bankDetailsSlice'
// ...

export const store = configureStore({
  reducer: {   
    users: userReducer,
    experience:experienceReducer,
    service:serviceSlice,
    bankDetails:bankDetailsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch