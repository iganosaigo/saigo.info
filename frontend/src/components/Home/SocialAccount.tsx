import React from 'react';
import { HStack, Link, Flex, IconButton } from '@chakra-ui/react';
import { SOCIALACCOUNTS } from '../../constants';

interface Props {
  spacing: number;
}

const SocialAccount: React.FC<Props> = ({ spacing }) => {
  return (
    <Flex alignItems="center" justify="center" w="100%">
      <HStack spacing={spacing}>
        {SOCIALACCOUNTS.map((sa, index) => (
          <IconButton
            variant={'ghost'}
            size="lg"
            isRound
            key={index}
            as={Link}
            isExternal
            href={sa.url}
            aria-label={sa.label}
            colorScheme={sa.type}
            rounded="full"
            icon={sa.icon}
          />
        ))}
      </HStack>
    </Flex>
  );
};

export default SocialAccount;
