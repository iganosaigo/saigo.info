import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// auth selectors
export const selectFullName = (state: RootState) => state.auth.userEntities?.fullname;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsAdmin = (state: RootState) => state.auth.userEntities?.roleName;

// pages selectors
export const selectPages = (state: RootState) => state.pages;
