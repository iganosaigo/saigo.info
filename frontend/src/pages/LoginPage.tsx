import React from 'react';

import Login from '../components/Login';
import { Container } from '@chakra-ui/react';

const LoginPage: React.FC<{}> = () => {
  return (
    <Container maxW="container.lg" p={{ base: 5, md: 10 }}>
      <Login />
    </Container>
  );
};

export default LoginPage;
