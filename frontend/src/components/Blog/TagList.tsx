import React from 'react';
// import { Tag } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { addFilterTag } from '../../redux/slices/pagesSlice';
import { Tag } from './Tag';

interface Props {
  tags: string[];
}

export const TagList: React.FC<Props> = ({ tags }) => {
  const dispatch = useAppDispatch();

  const handleClickAdd = (tag: string) => {
    dispatch(addFilterTag(tag));
  };

  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag} tagName={tag} handleClickAdd={handleClickAdd} />
      ))}
    </>
  );
};
