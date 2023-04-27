import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios';
import { dateFormatCreated } from '../utils';

interface ISearchParams {
  limit: number;
}

interface IPost {
  id: number;
  writer: string;
  title: string;
  content: string;
  tags: string[];
  created: string;
  modified: string | null;
  estimated: number;
}

export const fetchPostList = createAsyncThunk(
  'post/fetchPostList',
  async (params?: ISearchParams) => {
    const { data } = await axios.get<IPost[]>('/post/');
    // Formatting post's created field
    data.forEach((elem) => {
      elem.created = dateFormatCreated(elem.created);
    });
    return data;
  },
);

export const fetchPostId = createAsyncThunk('post/fetchPostId', async (id: string) => {
  const { data } = await axios.get(`/post/${id}`);
  return data;
});
