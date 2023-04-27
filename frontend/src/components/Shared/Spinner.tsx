import React from 'react';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner: React.FC<{}> = () => {
  return (
    <ChakraSpinner
      thickness="3px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal"
      size="xl"
      mt={{ base: '-1em', sm: 'auto' }}
      ml={{ base: '-1em', sm: 'auto' }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Spinner;
