import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import MainRouter from './routes';
import { useGetMeMutation } from './services/userApi';
import {
  deleteAccessTokenFromStorage,
  getAccessTokenFromStorage,
} from './services/localStorage';
import { clearAuth, setAccessToken } from './redux/slices/authSlice';
import { useAppDispatch } from './redux/hooks';
import NavBar from './components/NavBar';

const App: React.FC<{}> = () => {
  const [getMe] = useGetMeMutation();
  const dispatch = useAppDispatch();
  // const location = useLocation();

  React.useEffect(() => {
    const isLoggedIn = async () => {
      await getMe().unwrap();
    };

    try {
      const accessToken = getAccessTokenFromStorage();
      if (accessToken) {
        isLoggedIn();
        dispatch(setAccessToken(accessToken));
      }
    } catch {
      dispatch(clearAuth);
      deleteAccessTokenFromStorage();
    }
  }, [dispatch, getMe]);

  // TODO: Do we need reset filters after leaving URL /blog section?
  // React.useEffect(() => {
  //   if (!location.pathname.match(/blog/i)) {
  //     dispatch(setCurrentPage(1));
  //     dispatch(clearFilterState());
  //     // dispatch(blogApi.util.resetApiState());
  //     dispatch(blogApi.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]));
  //   }
  // }, [location]);

  return (
    <Flex direction="column">
      <NavBar />
      <Box px="4" py="6" mx="auto" maxW={'container.lg'} w="100%">
        <MainRouter />
      </Box>
      {/* <Footer /> */}
    </Flex>
  );
};

export default App;
