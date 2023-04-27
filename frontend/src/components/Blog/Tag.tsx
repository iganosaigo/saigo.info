import React from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';
import { useAppSelector, selectPages } from '../../redux/hooks';

interface Props {
  tagName: string;
  handleClickAdd: (tag: string) => void;
}

export const Tag: React.FC<Props> = ({ tagName, handleClickAdd }) => {
  const { filters_tags: selectedTags } = useAppSelector(selectPages);

  const isTagSelected = (tag: string) => {
    const findTag = selectedTags.find((selectedTag) => selectedTag === tag);
    if (findTag) {
      return {
        cursor: 'not-allowed',
        disabled: true,
        variant: 'solid',
      };
    }
    return {
      cursor: 'pointer',
      disabled: false,
      variant: 'outline',
    };
  };

  const tagProps = isTagSelected(tagName);

  return (
    <ChakraTag
      as="button"
      size="md"
      colorScheme="teal"
      onClick={() => handleClickAdd(tagName)}
      _hover={{
        bg: 'teal',
        color: 'white',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
      }}
      {...tagProps}
    >
      {tagName}
    </ChakraTag>
  );
};
