import { IconType } from 'react-icons';

// CONSTANTS
export interface ISkill {
  heading: string;
  content: string;
  icon: IconType;
}

export interface ISkills {
  title: string;
  skills: ISkill[];
}

//  Blog
export interface IPost {
  postId: string;
  writer: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  created: string;
  modified: string | null;
  estimated: number;
}

// LocalStorage interfaces
export interface IToken {
  expiresIn?: number;
  accessToken: string;
}

// Admin user edit state
export interface IUserState {
  email: string;
  fullname: string;
  password?: string;
  roleName: 'admin' | 'user';
  disabled: boolean;
}

// Post Editor state
export interface IPostState {
  title: string;
  description: string;
  content: string;
  tags: string[];
  estimated: number;
}
