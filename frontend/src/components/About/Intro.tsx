import React from 'react';
import { Text, VStack, HStack, Image, Box } from '@chakra-ui/react';
import { ABOUTME } from '../../constants';
import avatar from '../../assets/img/avatar01a.jpg';
import SocialAccount from '../Home/SocialAccount';

export const Intro: React.FC<{}> = () => {
  return (
    <VStack>
      <HStack
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        spacing={0}
        align="center"
      >
        <Box mr={{ base: '0', md: '10' }} alignSelf="center" alignContent={'center'}>
          <Image borderRadius="full" src={avatar} shadow="sm" w="initial" mb={'4'} />
        </Box>
        <VStack alignItems={'flex-start'}>
          {ABOUTME.map((line, index) => (
            <Text key={index} textAlign="justify" fontSize="lg">
              {line}
            </Text>
          ))}
        </VStack>
      </HStack>
    </VStack>
  );
};
