import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import logo from '../../assets/img/logo_mod.svg';

const Logo: React.FC = () => {
  return (
    <Box>
      <Image src={logo} height="32px" />
    </Box>
  );
};

export default Logo;
