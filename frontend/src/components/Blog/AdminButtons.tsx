import React from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { IPost } from '../../types';

interface Props {
  post: IPost;
  isLoading: boolean;
  handleClickDelete: () => void;
}

const AdminButtons: React.FC<Props> = ({ post, isLoading, handleClickDelete }) => {
  return (
    <HStack ml="4">
      <IconButton
        size="sm"
        icon={<AiFillDelete />}
        aria-label="Delete Post"
        onClick={handleClickDelete}
        isLoading={isLoading}
      />
      <RouterLink to={`/blog/${post.postId}/edit`}>
        <IconButton size="sm" icon={<AiFillEdit />} aria-label="Edit Post" />
      </RouterLink>
    </HStack>
  );
};

export default AdminButtons;
