import React, { Fragment } from 'react';
import { INTERESTS } from '../../constants';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { Skills } from './Skills';

export const Interests: React.FC<{}> = () => {
  return (
    <Container maxW="auto" p="5">
      {INTERESTS.map((interest, index) => (
        <Fragment key={index}>
          <Heading as="h3" fontSize="2xl" textAlign="center" pb={4}>
            {interest.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8" pt="2">
            <Skills skills={interest.skills} />
          </SimpleGrid>
        </Fragment>
      ))}
    </Container>
  );
};
