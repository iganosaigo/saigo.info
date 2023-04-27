import { IPost } from './';

// Queries Responses
export interface ILoginResponse {
  tokenType: string;
  accessToken: string;
}

export interface IMeResponse {
  id: number;
  email: string;
  fullname: string;
  disabled: boolean;
  roleName: 'user' | 'admin';
}

export interface ICreateUserResponse {
  id: number;
}

export interface IUsersResponse {
  id: number;
  email: string;
  fullname: string;
  disabled: boolean;
  roleName: 'admin' | 'user';
}

export interface ICreatePostResponse {
  postId: string;
}

export interface IGetPostByIdResponse extends IPost {}

export interface IGetPagesResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  filterTags: string[];
  data: IPost[];
}

// Queries Requests
export interface ICreateUserRequest {
  email: string;
  fullname: string;
  password?: string;
  disabled: boolean;
  roleName: 'admin' | 'user';
}

export interface IUpdateUserRequest extends ICreateUserRequest {
  userId: string;
}

interface IBaseGetPagesRequest {
  page: number;
  pageSize: number;
  sort?: 'id' | 'created';
  order?: 'asc' | 'desc';
}

interface IFilters {
  author?: string;
  tags?: string[];
}

export interface IGetPagesRequest extends IBaseGetPagesRequest {
  filters?: IFilters;
}

export interface ICreatePostRequest {
  title: string;
  description: string;
  content: string;
  tags: string[];
  estimated: number;
}

export interface IUpdatePostRequest extends ICreatePostRequest {
  postId: string;
}

export interface IChangeUserPasswordRequest {
  userId: number;
  newPassword: string;
}

export interface IChangeMePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
