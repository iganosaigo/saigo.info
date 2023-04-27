import React, { lazy, Suspense } from 'react';
import { Tr, Td, Switch, Link, HStack, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useDeleteUserMutation, useDisableUserMutation } from '../../services/userApi';
import { useAppSelector, selectFullName } from '../../redux/hooks';
import { IUsersResponse } from '../../types/Query';

const AdminChangeUserPassword = lazy(() => import('./AdminChangeUserPassword'));

interface Props extends IUsersResponse {}

const AdminUserTable: React.FC<Props> = ({
  id,
  email,
  fullname,
  roleName,
  disabled,
}) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [disableUser] = useDisableUserMutation();
  const currentUserName = useAppSelector(selectFullName);

  const currentUserColor = currentUserName === fullname ? 'teal.50' : '';

  const handleChangeSwitcher = async () => {
    if (roleName === 'admin' && !disabled) {
      if (!window.confirm(`Disable admin user ${email}?`)) {
        return;
      }
    }
    try {
      await disableUser({ userID: id, disabled: !disabled }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDelete = async () => {
    if (window.confirm(`Delete user ${email}?`)) {
      try {
        await deleteUser(id).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Tr bg={currentUserColor}>
      <Td>{id}</Td>
      <Td>
        <Link as={RouterLink} color="blue.400" to={`/admin/users/${id}/edit`}>
          {email}
        </Link>
      </Td>
      <Td>{fullname}</Td>
      <Td>{roleName}</Td>
      <Td>
        <Switch
          colorScheme="red"
          id="email-alerts"
          isChecked={disabled}
          onChange={handleChangeSwitcher}
        />
      </Td>
      <Td>
        <HStack>
          <Suspense fallback={<></>}>
            <AdminChangeUserPassword userId={id} />
          </Suspense>
          <Link as={RouterLink} color="blue.400" to={`/admin/users/${id}/edit`}>
            <IconButton
              rounded="xl"
              colorScheme="green"
              size="sm"
              icon={<AiFillEdit />}
              aria-label="Edit User"
              variant="outline"
            />
          </Link>
          <IconButton
            rounded="xl"
            colorScheme="red"
            size="sm"
            icon={<AiFillDelete />}
            aria-label="Delete User"
            onClick={handleClickDelete}
            variant="outline"
            isLoading={isLoading}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

export default AdminUserTable;
