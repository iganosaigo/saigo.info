import React from 'react';
import { useAppSelector, selectIsLoggedIn } from '../../redux/hooks';
import { Center, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ActionButton from '../Shared/ActionButton';

interface Props {
  postId: string;
  isLoading: boolean;
  handleClickDelete: () => void;
}

const AdminButtons: React.FC<Props> = ({ postId, isLoading, handleClickDelete }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Center>
      <HStack>
        <RouterLink to={`/blog/${postId}/edit`}>
          <ActionButton>Edit</ActionButton>
        </RouterLink>
        <ActionButton isLoading={isLoading} onClick={handleClickDelete}>
          Delete
        </ActionButton>
      </HStack>
    </Center>
  );
};

export default AdminButtons;
