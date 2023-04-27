import React from 'react';
import AdminUserEdit from '../components/Admin/AdminUserEdit';
import { Box } from '@chakra-ui/react';

const UserEditPage: React.FC<{}> = () => {
  return (
    <Box mx="auto" maxW="container.md">
      <AdminUserEdit />
    </Box>
  );
};

export default UserEditPage;
