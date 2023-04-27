import React, { Fragment } from 'react';
import { PostCard } from './PostCard';
import { IPost } from '../../types';
import { Divider } from '@chakra-ui/react';

interface Props {
  postList: IPost[];
}

export const PostList: React.FC<Props> = ({ postList }) => {
  return (
    <>
      {postList.map((post, index) => (
        <Fragment key={post.postId}>
          <PostCard post={post} />
          {postList.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </>
  );
};
