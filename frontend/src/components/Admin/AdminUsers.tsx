import React from 'react';
import {
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { useGetUsersQuery } from '../../services/userApi';
import Spinner from '../Shared/Spinner';
import AdminUserTable from './AdminUserTable';
import ActionButton from '../Shared/ActionButton';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorUnknown } from '../Errors';

const AdminUsers: React.FC<{}> = () => {
  const { data: usersData, error, isLoading, isFetching } = useGetUsersQuery();

  if (error) {
    return <ErrorUnknown />;
  }

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <Box>
      <HStack mb="4">
        <RouterLink to={`/admin/add-user`}>
          <ActionButton>Add User</ActionButton>
        </RouterLink>
      </HStack>
      {usersData ? (
        <TableContainer>
          <Table size="sm" variant="simple" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>Fullname</Th>
                <Th>Role</Th>
                <Th>Disabled</Th>
                <Th>Fast Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersData.map((user) => (
                <AdminUserTable key={user.email} {...user} />
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  <Text fontSize="md">Total: {usersData?.length}</Text>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  );
};

export default AdminUsers;
