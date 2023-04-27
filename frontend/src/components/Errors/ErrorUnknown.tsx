import React from 'react';
import { VStack, Center, Heading, Text } from '@chakra-ui/react';

export const ErrorUnknown: React.FC = () => {
  return (
    <Center mt="20">
      <VStack spacing="6">
        <Heading>Произошла ошибка 😕</Heading>
        <Text fontWeight={600}>
          Не удалось получить список постов. Пожалуйста, попробуйте позже...
        </Text>
      </VStack>
    </Center>
  );
};
