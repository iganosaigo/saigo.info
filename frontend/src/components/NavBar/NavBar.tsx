import React from 'react';
import { Box, Divider, Flex, useDisclosure } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector, selectIsLoggedIn } from '../../redux/hooks';
import { clearAuth } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { deleteAccessTokenFromStorage } from '../../services/localStorage';
import DrawerMenu from './DrawerMenu';
import Panel from './Panel';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleClickAuth = () => {
    if (isLoggedIn) {
      if (window.confirm('Confirm logout')) {
        dispatch(clearAuth());
        deleteAccessTokenFromStorage();
        navigate('/', { replace: true });
      }
    } else {
      navigate('/login');
    }
    onClose();
  };

  return (
    <Box px="4" as="nav" w="100%">
      <Flex
        h="16"
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        maxW="container.lg"
      >
        <Panel
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          handleClickAuth={handleClickAuth}
        />
      </Flex>
      <Divider maxW={'container.lg'} mx="auto" border="1px solid" />

      {/* Mobile Drawer Menu */}
      {isOpen ? (
        <DrawerMenu
          isOpen={isOpen}
          onClose={onClose}
          handleClickAuth={handleClickAuth}
        />
      ) : null}
    </Box>
  );
};

export default NavBar;
