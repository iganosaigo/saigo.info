import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';
import { setUserDetails, setIsLoggedIn } from '../redux/slices/authSlice';
import { getAccessTokenFromStorage } from './localStorage';
import { camelizeResponse, decamelizeRequest } from '../utils';
import {
  IUsersResponse,
  IMeResponse,
  ICreateUserResponse,
  ICreateUserRequest,
  IUpdateUserRequest,
  IChangeUserPasswordRequest,
  IChangeMePasswordRequest,
} from '../types/Query';
import { BACKEND_URL } from '../constants';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/v1/user/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const accessToken = getAccessTokenFromStorage();

      // Specify header Authorization for endpoints only where it's realy needed.
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Users'],
  endpoints: (builder) => ({
    getMe: builder.mutation<IMeResponse, void>({
      query: () => ({
        url: 'me',
        method: 'GET',
      }),
      transformResponse: camelizeResponse,
      // Set accessToken to Redux and LocalStorage if login success.
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserDetails(data));
          dispatch(setIsLoggedIn(true));
        } catch {}
      },
    }),
    changeMePassword: builder.mutation<IMeResponse, IChangeMePasswordRequest>({
      query: ({ ...body }) => ({
        url: 'me/changepassword',
        method: 'POST',
        body: decamelizeRequest(body),
      }),
      transformResponse: camelizeResponse,
      // Set accessToken to Redux and LocalStorage if login success.
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setUserDetails(data));
      //     dispatch(setIsLoggedIn(true));
      //   } catch {}
      // },
    }),
    getUsers: builder.query<IUsersResponse[], void>({
      query: () => ({
        url: '',
        params: {},
      }),
      transformResponse: camelizeResponse,
      providesTags: ['Users'],
    }),

    getUserByID: builder.query<IUsersResponse, number>({
      query: (userID) => ({
        url: `${userID}`,
      }),
      transformResponse: camelizeResponse,
      // providesTags: ['Users'],
    }),

    createUser: builder.mutation<ICreateUserResponse, ICreateUserRequest>({
      query: (userData) => ({
        url: '',
        method: 'POST',
        body: decamelizeRequest(userData),
      }),
      transformResponse: camelizeResponse,
      invalidatesTags: ['Users'],
    }),

    updateUser: builder.mutation<ICreateUserResponse, IUpdateUserRequest>({
      query: ({ userId, ...userData }) => ({
        url: `/${userId}`,
        method: 'PUT',
        body: decamelizeRequest(userData),
      }),
      transformResponse: camelizeResponse,
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation<IMeResponse, number>({
      query: (userId) => ({
        url: `${userId}`,
        method: 'DELETE',
      }),
      transformResponse: camelizeResponse,
      invalidatesTags: ['Users'],
    }),

    // TODO: change any to type
    disableUser: builder.mutation<IUsersResponse, any>({
      query: ({ userID, disabled }) => ({
        url: `/${userID}/disable`,
        method: 'POST',
        body: { disabled },
      }),
      transformResponse: camelizeResponse,
      invalidatesTags: ['Users'],
    }),

    changeUserPassword: builder.mutation<
      { success: boolean },
      IChangeUserPasswordRequest
    >({
      query: ({ userId, ...body }) => ({
        url: `/${userId}/changepassword`,
        method: 'POST',
        body: decamelizeRequest(body),
      }),
      transformResponse: camelizeResponse,
    }),
  }),
});

export const {
  useGetMeMutation,
  useGetUsersQuery,
  useGetUserByIDQuery,
  useDeleteUserMutation,
  useDisableUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useChangeUserPasswordMutation,
  useChangeMePasswordMutation,
} = userApi;
