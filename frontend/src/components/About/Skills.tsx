import React from 'react';
import { Box, Text, Icon, Heading } from '@chakra-ui/react';
import { ISkill } from '../../types';

type Props = {
  skills: ISkill[];
};

export const Skills: React.FC<Props> = ({ skills }) => {
  return (
    <>
      {skills.map((skill, index) => (
        <Box px={{ base: '0', md: '30' }} key={index} textAlign="center">
          <Icon as={skill.icon} w="8" h="8" color="teal" />
          <Heading as="h4" fontWeight="semibold" fontSize="xl">
            {skill.heading}
          </Heading>
          <Text>{skill.content}</Text>
        </Box>
      ))}
    </>
  );
};
