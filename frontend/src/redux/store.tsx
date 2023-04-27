import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import pages from './slices/pagesSlice';
import auth from './slices/authSlice';
import { blogApi } from '../services/blogApi';
import { authApi } from '../services/authApi';
import { userApi } from '../services/userApi';

export const store = configureStore({
  reducer: {
    auth,
    pages,
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      blogApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
