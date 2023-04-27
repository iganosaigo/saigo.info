import React from 'react';
import { Flex } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

const NavItem: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      transition=".15s ease"
      _hover={{
        bg: 'gray.100',
      }}
    >
      {children}
    </Flex>
  );
};

export default NavItem;
