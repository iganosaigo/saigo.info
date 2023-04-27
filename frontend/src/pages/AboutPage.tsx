import React from 'react';
import { Container } from '@chakra-ui/react';
import About from '../components/About';

const AboutPage: React.FC<{}> = () => {
  return (
    <Container maxW="container.lg" px={0}>
      <About />
    </Container>
  );
};

export default AboutPage;
