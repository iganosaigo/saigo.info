import React from 'react';
import { chakra, Heading, Stack, Text, Button, Image, Link } from '@chakra-ui/react';
import { VscFilePdf } from 'react-icons/vsc';
import avatar from '../../assets/img/avatar01a.jpg';
import { MYNAME } from '../../constants';

const Hero: React.FC<{}> = () => {
  return (
    <Stack direction="column" spacing="10" alignItems="center">
      <Image borderRadius="full" w={180} src={avatar} shadow="xl" />
      <Heading
        as="h1"
        fontSize={{ base: '3xl', md: '4xl' }}
        fontWeight="bold"
        textAlign="center"
      >
        Блог{' '}
        <chakra.span
          color="teal"
          bgGradient="linear(to-t, teal.100, cyan.400)"
          filter={'drop-shadow(2px 2px 1px #15182f)'}
          sx={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {MYNAME}
        </chakra.span>
      </Heading>
      <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
        Минималистичный, домашний микробложик. Тут я пишу о нюансах технологий, развитии
        карьеры в сфере DevOps и SRE, а так же о мире финансов в реалиях цифровой эпохи
        и своих размышлениях.
      </Text>
      {/* <Button
        as={Link}
        isExternal
        href="https://github.com"
        style={{ textDecoration: 'none' }}
        colorScheme="teal"
        variant="outline"
        leftIcon={<VscFilePdf />}
        rounded="md"
        size="md"
        height="3rem"
        fontSize="1.2rem"
        shadow={'md'}
      >
        Resume
      </Button> */}
    </Stack>
  );
};

export default Hero;
