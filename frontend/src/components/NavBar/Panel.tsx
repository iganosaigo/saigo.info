import React, { lazy, Suspense } from 'react';
import { Button, HStack, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

import { useAppSelector, selectIsLoggedIn } from '../../redux/hooks';
import { NAVLINKS, AUTHLINKS } from '../../constants';
import Logo from './Logo';
import NavLink from './NavLink';
const AdminMenu = lazy(() => import('../Admin/AdminMenu'));

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleClickAuth: () => void;
}

const Panel: React.FC<Props> = ({ isOpen, onClose, onOpen, handleClickAuth }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const authStatus = isLoggedIn ? AUTHLINKS.logout : AUTHLINKS.login;

  return (
    <>
      <HStack fontSize="lg">
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <HStack
          pl="8"
          as="nav"
          spacing="4"
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
        >
          {NAVLINKS.map((link) => (
            <NavLink key={link.name} onClose={onClose} {...link} />
          ))}
        </HStack>
      </HStack>
      <HStack spacing={4}>
        {isLoggedIn ? (
          <Suspense fallback={<></>}>
            <AdminMenu />
          </Suspense>
        ) : null}
        <IconButton
          px="0"
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          onClick={isOpen ? onClose : onOpen}
          display={{ base: 'inherit', md: 'none' }}
          cursor="pointer"
        />
        <Button
          bg="teal.400"
          color="white"
          _hover={{
            bg: 'teal.300',
          }}
          rounded="md"
          boxShadow="lg"
          variant="outline"
          display={{ base: 'none', md: 'initial' }}
          onClick={handleClickAuth}
          shadow="md"
        >
          {authStatus.name}
        </Button>
      </HStack>
    </>
  );
};

export default Panel;
