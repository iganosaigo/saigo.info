import React from 'react';
import Home from '../components/Home';
import { Container } from '@chakra-ui/react';

const HomePage: React.FC<{}> = () => {
  return (
    <Container textAlign="left" mx="auto" maxW="container.md">
      <Home />
    </Container>
  );
};

export default HomePage;
