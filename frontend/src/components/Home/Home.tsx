import React from 'react';
import { Divider } from '@chakra-ui/react';
import Hero from './Hero';
import SocialAccount from './SocialAccount';

const Home: React.FC<{}> = () => {
  return (
    <>
      <Hero />
      <Divider mt="10" mb="2" border="1px solid" />
      <SocialAccount spacing={6} />
    </>
  );
};

export default Home;
