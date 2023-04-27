import React from 'react';
import {
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/authApi';
import { useGetMeMutation } from '../../services/userApi';
import { useAppDispatch } from '../../redux/hooks';
import { clearAuth } from '../../redux/slices/authSlice';
import { deleteAccessTokenFromStorage } from '../../services/localStorage';

const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [login, { isLoading }] = useLoginMutation();
  const [getMe] = useGetMeMutation();

  const handleClickLogin = async () => {
    // Clear redux and LocalStorage before login attempt
    dispatch(clearAuth);
    deleteAccessTokenFromStorage();
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    try {
      await login(formData).unwrap();
      await getMe().unwrap();
      navigate('/');
    } catch (err) {
      // TODO: make error handling more clear for UI expirience
      // https://codesandbox.io/s/x4d1to?file=/src/helpers.ts:288-306
      // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
      setCredentials({
        username: '',
        password: '',
      });

      toast({
        title: 'Login error.',
        description: 'Check your credentials and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickLogin();
    }
  };

  return (
    <Center>
      <Stack spacing="4">
        <Heading as="h1" fontSize="2xl" textAlign="center">
          Login to your account
        </Heading>
        <VStack
          as="form"
          boxSize={{ sm: 'sm', md: 'md' }}
          h="max-content !important"
          bg="white"
          rounded="xl"
          boxShadow="2xl"
          p={{ base: 5, sm: 10 }}
          spacing={8}
        >
          <VStack spacing="4" w="100%">
            <FormControl id="email">
              <Input
                name="username"
                value={credentials.username}
                focusBorderColor="teal.400"
                placeholder="Email"
                rounded="md"
                type="email"
                onChange={handleChangeInput}
              />
            </FormControl>
            <FormControl id="password">
              <Input
                name="password"
                value={credentials.password}
                focusBorderColor="teal.400"
                placeholder="Password"
                rounded="md"
                type="password"
                onChange={handleChangeInput}
                onKeyPress={handleKeypress}
              />
            </FormControl>
          </VStack>
          <Button
            bg="teal.400"
            color="white"
            _hover={{
              bg: 'teal.300',
            }}
            rounded="md"
            w="100%"
            boxShadow="lg"
            onClick={handleClickLogin}
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </VStack>
      </Stack>
    </Center>
  );
};

export default Login;
