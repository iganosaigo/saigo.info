import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken } from '../redux/slices/authSlice';
import { setAccessTokenToStorage } from './localStorage';
import { camelizeResponse } from '../utils';
import { ILoginResponse } from '../types/Query';
import { BACKEND_URL } from '../constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/v1/auth/` }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, FormData>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: camelizeResponse,
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAccessTokenToStorage({ accessToken: data.accessToken });
          dispatch(setAccessToken(data.accessToken));
        } catch {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
