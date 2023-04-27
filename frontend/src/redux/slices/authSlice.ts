import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUserEntities = {
  id: number;
  fullname: string;
  email: string;
  roleName: 'user' | 'admin';
  disabled: boolean;
};

interface IUserState {
  userEntities: TUserEntities | null;
  isLoggedIn: boolean;
  accessToken: string | null;
}

const initialState: IUserState = {
  userEntities: null,
  isLoggedIn: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    deleteAccessToken(state) {
      state.accessToken = null;
    },
    setUserDetails(state, action: PayloadAction<TUserEntities>) {
      state.userEntities = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    clearAuth: () => initialState,
  },
});

export const { setAccessToken, setUserDetails, setIsLoggedIn, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
