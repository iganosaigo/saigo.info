import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessTokenFromStorage } from './localStorage';
import { RootState } from '../redux/store';
import { updatePageParams } from '../redux/slices/pagesSlice';
import { camelizeResponse } from '../utils';
import {
  ICreatePostResponse,
  IGetPagesRequest,
  IGetPagesResponse,
  IGetPostByIdResponse,
  ICreatePostRequest,
  IUpdatePostRequest,
} from '../types/Query';
import { BACKEND_URL } from '../constants';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/v1/post`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const endpointsWithAuth = ['createPost', 'deletePost', 'updatePost'];
      const accessToken = (getState() as RootState).auth.accessToken;

      // Specify header Authorization for endpoints only where it's realy needed.
      if (accessToken && endpointsWithAuth.includes(endpoint)) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts', 'Post'],

  endpoints: (builder) => ({
    getPages: builder.query<IGetPagesResponse, IGetPagesRequest>({
      query: ({ filters, sort, order, page, pageSize }) => ({
        url: '/',
        //  TODO: research about url parameters as array or multiply keys for tags
        params: { page, page_size: pageSize, sort, order, tags: filters?.tags },
      }),
      transformResponse: camelizeResponse,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updatePageParams(data));
        } catch (err) {
          console.error(err);
        }
      },
      // providesTags: ['Posts'],
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ postId }) => ({ type: 'Posts' as const, postId })),
              { type: 'Posts', id: 'LIST' },
            ]
          : ['Posts'],
    }),

    getPostById: builder.query<IGetPostByIdResponse, string>({
      query: (id) => `/${id}`,
      transformResponse: camelizeResponse,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation<ICreatePostResponse, ICreatePostRequest>({
      query: (postData) => ({
        url: '/',
        method: 'POST',
        body: postData,
      }),
      transformResponse: camelizeResponse,
      invalidatesTags: ['Posts'],

      // Set accessToken to Redux and LocalStorage if login success.
      // async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //   } catch {}
      // },
    }),

    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/${postId}`,
        method: 'DELETE',
      }),
      transformResponse: camelizeResponse,
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation<ICreatePostResponse, IUpdatePostRequest>({
      query: ({ postId, ...body }) => ({
        url: `/${postId}`,
        method: 'PUT',
        body: body,
      }),
      transformResponse: camelizeResponse,
      invalidatesTags: ['Posts', 'Post'],
    }),
  }),
});

export const {
  useGetPagesQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = blogApi;
