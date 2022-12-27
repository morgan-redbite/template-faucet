import { configureStore } from "@reduxjs/toolkit";
//import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import settingReducer from './setting.slice';
const store = configureStore({
  reducer: {
    setting: settingReducer
  },
  // middleware: [createLogger(), thunk],
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
