import React from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  Flex,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import NavLink from './NavLink';
import { NAVLINKS } from '../../constants';
import { useAppSelector, selectIsLoggedIn } from '../../redux/hooks';
import { AUTHLINKS } from '../../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleClickAuth: () => void;
}

const DrawerMenu: React.FC<Props> = ({ isOpen, onClose, handleClickAuth }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const authStatus = isLoggedIn ? AUTHLINKS.logout : AUTHLINKS.login;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" ml="4">
          <DrawerCloseButton size="lg" />
          Menu
        </DrawerHeader>
        <DrawerBody>
          <Flex
            direction="column"
            as="nav"
            fontSize="md"
            color="gray.600"
            aria-label="Main Navigation"
          >
            {NAVLINKS.map((link) => (
              <NavItem key={link.name}>
                <NavLink onClose={onClose} props={{ w: '100%', h: '100%' }} {...link} />
              </NavItem>
            ))}
            <NavItem>
              <Box
                fontWeight="medium"
                letterSpacing="tight"
                px={2}
                py={1}
                onClick={handleClickAuth}
                w="100%"
                h="100%"
                _hover={{
                  color: 'teal',
                }}
              >
                {authStatus.name}
              </Box>
            </NavItem>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
