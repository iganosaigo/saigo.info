import React from 'react';
import { HStack, Box, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { rmFilterTag } from '../../redux/slices/pagesSlice';
import { selectPages, useAppSelector } from '../../redux/hooks';

const Search: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { filters_tags: tags } = useAppSelector(selectPages);

  const handleClickDelete = React.useCallback(
    (name: string) => {
      dispatch(rmFilterTag(name));
    },
    [dispatch],
  );

  return (
    <>
      {tags.length ? (
        <Box pb="4">
          <HStack>
            {tags.map((name) => (
              <Tag size="md" key={name} variant="solid" colorScheme="teal">
                <TagLabel>{name}</TagLabel>
                <TagCloseButton onClick={() => handleClickDelete(name)} />
              </Tag>
            ))}
          </HStack>
        </Box>
      ) : null}
    </>
  );
};

export default Search;
