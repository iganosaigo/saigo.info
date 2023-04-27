import React from 'react';
import { VStack, HStack, Input, Select, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetUserByIDQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../services/userApi';
import Spinner from '../Shared/Spinner';
import ActionButton from '../Shared/ActionButton';
import { IUserState } from '../../types';
import { ICreateUserRequest, IUpdateUserRequest } from '../../types/Query';

const AdminUserEdit: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEditing = Boolean(userId);
  const [skipFetch, setSkipFetch] = React.useState(true);

  const [userState, setUserState] = React.useState<IUserState>({
    email: '',
    fullname: '',
    password: '',
    roleName: 'user',
    disabled: false,
  });

  const { data: userData, isLoading } = useGetUserByIDQuery(Number(userId), {
    skip: skipFetch,
    refetchOnMountOrArgChange: true,
  });
  const [createUser, { isLoading: createUserIsLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: updateUserIsLoading }] = useUpdateUserMutation();

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    let new_value: string | boolean = value;
    if (name === 'disabled') {
      if (value === 'true') {
        new_value = true;
      } else {
        new_value = false;
      }
    }
    setUserState((prevState) => ({
      ...prevState,
      [name]: new_value,
    }));
  };

  const handleClickApply = async () => {
    const { email, fullname, roleName, disabled, password } = userState;
    const final: ICreateUserRequest | IUpdateUserRequest = {
      email,
      fullname,
      roleName,
      disabled,
    };

    try {
      if (isEditing && userId) {
        await updateUser({ userId, ...final }).unwrap();
      } else {
        final['password'] = password;
        await createUser(final).unwrap();
      }
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCancel = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    if (isEditing) {
      setSkipFetch(false);
    }
  }, [isEditing]);

  React.useEffect(() => {
    if (userData) {
      const { email, fullname, roleName, disabled } = userData;
      setUserState({
        email,
        fullname,
        roleName,
        disabled,
      });
    }
  }, [userData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack align="left">
      <HStack>
        <Text w="100px">Email:</Text>
        <Input
          name="email"
          mt="4"
          w="350px"
          value={userState.email}
          onChange={handleChangeInput}
        />
      </HStack>
      <HStack>
        <Text w="100px">Fullname: </Text>
        <Input
          name="fullname"
          mt="4"
          w="350px"
          value={userState.fullname}
          onChange={handleChangeInput}
        />
      </HStack>

      {isEditing ? null : (
        <HStack>
          <Text w="100px">Password: </Text>
          <Input
            name="password"
            mt="4"
            w="350px"
            value={userState.password}
            type="password"
            onChange={handleChangeInput}
          />
        </HStack>
      )}

      <HStack>
        <Text w="100px">Role:</Text>
        <Select
          name="roleName"
          mt="4"
          w="100px"
          value={userState.roleName}
          onChange={handleChangeInput}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </Select>
      </HStack>
      <HStack>
        <Text w="100px">Disabled</Text>
        <Select
          name="disabled"
          mt="4"
          w="100px"
          value={userState.disabled.toString()}
          onChange={handleChangeInput}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </Select>
      </HStack>
      <HStack align="center" pt="18">
        <ActionButton
          onClick={handleClickApply}
          isLoading={createUserIsLoading || updateUserIsLoading}
        >
          {isEditing ? 'Apply' : 'Add'}
        </ActionButton>
        <ActionButton onClick={handleClickCancel}>Cancel</ActionButton>
      </HStack>
    </VStack>
  );
};

export default AdminUserEdit;
