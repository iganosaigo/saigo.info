import React from 'react';
import { Interests } from './Interests';
import { Intro } from './Intro';
import SocialAccount from '../Home/SocialAccount';
import { Divider } from '@chakra-ui/react';

const About: React.FC<{}> = () => {
  return (
    <>
      <Intro />
      <Interests />
      <Divider mt="10" border="1px solid" />
      <SocialAccount spacing={6} />
    </>
  );
};

export default About;
